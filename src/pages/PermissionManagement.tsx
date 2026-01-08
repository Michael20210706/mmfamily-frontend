import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
} from '@ant-design/icons';
import httpClient from '../config/axiosConfig';
import { PERMISSION_API } from '../config/api';
import { Permission } from '../types';
import './Management.css';

// 资源列表
const RESOURCES = [
  { label: '用户管理', value: 'user' },
  { label: '角色管理', value: 'role' },
  { label: '权限管理', value: 'permission' },
  { label: '部门管理', value: 'department' },
  { label: '菜单管理', value: 'menu' },
];

// 操作列表
const ACTIONS = [
  { label: '查看', value: 'view' },
  { label: '创建', value: 'create' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'delete' },
  { label: '导出', value: 'export' },
  { label: '导入', value: 'import' },
];

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });

  const fetchPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(PERMISSION_API.getPermissionList, {
        params: {
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
      });
      setPermissions(response.data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
      }));
    } catch (error) {
      message.error('获取权限列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const handleAddPermission = () => {
    setEditingPermission(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission);
    form.setFieldsValue({
      name: permission.name,
      code: permission.code,
      resource: permission.resource,
      action: permission.action,
      description: permission.description,
    });
    setIsModalVisible(true);
  };

  const handleDeletePermission = async (permissionId: string) => {
    try {
      await httpClient.delete(PERMISSION_API.deletePermission(permissionId));
      message.success('权限删除成功');
      fetchPermissions();
    } catch (error) {
      message.error('删除权限失败');
    }
  };

  const handleSavePermission = async (values: any) => {
    try {
      setLoading(true);
      // 自动生成权限编码
      const code = `${values.resource}:${values.action}`;
      const payload = { ...values, code };

      if (editingPermission) {
        await httpClient.put(PERMISSION_API.updatePermission(editingPermission.id), payload);
        message.success('权限更新成功');
      } else {
        await httpClient.post(PERMISSION_API.createPermission, payload);
        message.success('权限创建成功');
      }
      setIsModalVisible(false);
      fetchPermissions();
    } catch (error) {
      message.error(editingPermission ? '更新权限失败' : '创建权限失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span>
          <LockOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
      render: (code: string) => (
        <Tag color="cyan">{code}</Tag>
      ),
    },
    {
      title: '资源',
      dataIndex: 'resource',
      key: 'resource',
      render: (resource: string) => {
        const resourceObj = RESOURCES.find((r) => r.value === resource);
        return <Tag color="blue">{resourceObj?.label || resource}</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => {
        const actionObj = ACTIONS.find((a) => a.value === action);
        return <Tag color="green">{actionObj?.label || action}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Permission) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditPermission(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该权限?"
            onConfirm={() => handleDeletePermission(record.id)}
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
        title="🔐 权限管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPermission}>
            添加权限
          </Button>
        }
        className="management-card"
      >
        <Table
          columns={columns}
          dataSource={permissions}
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

      <Modal
        title={editingPermission ? '编辑权限' : '添加权限'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePermission}
        >
          <Form.Item
            name="name"
            label="权限名称"
            rules={[
              { required: true, message: '请输入权限名称' },
              { min: 2, message: '权限名称至少2个字符' },
            ]}
          >
            <Input placeholder="输入权限名称，如：创建用户" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="resource"
                label="资源"
                rules={[{ required: true, message: '请选择资源' }]}
              >
                <Select
                  placeholder="选择资源"
                  options={RESOURCES}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="action"
                label="操作"
                rules={[{ required: true, message: '请选择操作' }]}
              >
                <Select
                  placeholder="选择操作"
                  options={ACTIONS}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea
              placeholder="输入权限描述"
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="code"
            label="权限编码（自动生成，不需修改）"
          >
            <Input disabled placeholder="resource:action" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;

