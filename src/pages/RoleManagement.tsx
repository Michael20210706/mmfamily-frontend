import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  Tree,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import httpClient from '../config/axiosConfig';
import { ROLE_API, PERMISSION_API } from '../config/api';
import { Role, Permission } from '../types';
import './Management.css';

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [form] = Form.useForm();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(ROLE_API.getRoleList, {
        params: {
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
      });
      setRoles(response.data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
      }));
    } catch (error) {
      message.error('获取角色列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  const fetchPermissions = useCallback(async () => {
    try {
      const response = await httpClient.get(PERMISSION_API.getPermissionList);
      setPermissions(response.data.data || []);
    } catch (error) {
      console.error('获取权限列表失败:', error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, [fetchRoles, fetchPermissions]);

  const handleAddRole = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
    });
    setIsModalVisible(true);
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await httpClient.delete(ROLE_API.deleteRole(roleId));
      message.success('角色删除成功');
      fetchRoles();
    } catch (error) {
      message.error('删除角色失败');
    }
  };

  const handleSaveRole = async (values: any) => {
    try {
      setLoading(true);
      if (editingRole) {
        await httpClient.put(ROLE_API.updateRole(editingRole.id), values);
        message.success('角色更新成功');
      } else {
        await httpClient.post(ROLE_API.createRole, values);
        message.success('角色创建成功');
      }
      setIsModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error(editingRole ? '更新角色失败' : '创建角色失败');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPermissionModal = async (role: Role) => {
    setSelectedRole(role);
    try {
      const response = await httpClient.get(ROLE_API.getRolePermissions(role.id));
      setSelectedPermissions(response.data.data?.map((p: Permission) => p.id) || []);
    } catch (error) {
      console.error('获取角色权限失败:', error);
    }
    setIsPermissionModalVisible(true);
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    try {
      setLoading(true);
      await httpClient.post(ROLE_API.assignPermission, {
        roleId: selectedRole.id,
        permissionIds: selectedPermissions,
      });
      message.success('权限分配成功');
      setIsPermissionModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error('权限分配失败');
    } finally {
      setLoading(false);
    }
  };

  // 构建权限树结构
  const buildPermissionTree = () => {
    const resources = new Map<string, Permission[]>();
    permissions.forEach((perm) => {
      if (!resources.has(perm.resource)) {
        resources.set(perm.resource, []);
      }
      resources.get(perm.resource)?.push(perm);
    });

    return Array.from(resources.entries()).map(([resource, perms]) => ({
      title: resource,
      key: `resource-${resource}`,
      children: perms.map((perm) => ({
        title: `${perm.action} - ${perm.name}`,
        key: perm.id,
      })),
    }));
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span>
          <TeamOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限数',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: Permission[]) => {
        const count = permissions?.length || 0;
        return <Tag color="blue">{count} 个</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Role) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
          >
            编辑
          </Button>
          <Button
            size="small"
            onClick={() => handleOpenPermissionModal(record)}
          >
            分配权限
          </Button>
          <Popconfirm
            title="确定删除该角色?"
            onConfirm={() => handleDeleteRole(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="management-page">
      <Card
        title="👥 角色管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRole}>
            添加角色
          </Button>
        }
        className="management-card"
      >
        <Table
          columns={columns}
          dataSource={roles}
          loading={loading}
          rowKey="id"
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => {
              setPagination({ page, pageSize, total: pagination.total });
            },
          }}
        />
      </Card>

      {/* 角色编辑Modal */}
      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveRole}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[
              { required: true, message: '请输入角色名称' },
              { min: 2, message: '角色名称至少2个字符' },
            ]}
          >
            <Input placeholder="输入角色名称" disabled={!!editingRole} />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea
              placeholder="输入角色描述"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限分配Modal */}
      <Modal
        title={`为角色 "${selectedRole?.name}" 分配权限`}
        open={isPermissionModalVisible}
        onCancel={() => setIsPermissionModalVisible(false)}
        onOk={handleSavePermissions}
        confirmLoading={loading}
        width={600}
      >
        <Spin spinning={loading}>
          <Tree
            checkable
            expandedKeys={permissions.map((p) => `resource-${p.resource}`)}
            defaultExpandedKeys={permissions.map((p) => `resource-${p.resource}`)}
            treeData={buildPermissionTree()}
            checkedKeys={selectedPermissions}
            onCheck={(checkedKeys: any) => {
              const keys = Array.isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;
              setSelectedPermissions(
                keys.filter((key: any) => !String(key).startsWith('resource-')) as string[]
              );
            }}
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default RoleManagement;

