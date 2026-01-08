import React from 'react';
import { Row, Col, Card, Statistic, List, Avatar, Tag } from 'antd';
import { UserOutlined, TeamOutlined, LockOutlined, FileTextOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // 模拟数据
  const stats = [
    {
      title: '总用户数',
      value: 156,
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: '总角色数',
      value: 12,
      icon: <TeamOutlined />,
      color: '#52c41a',
    },
    {
      title: '总权限数',
      value: 48,
      icon: <LockOutlined />,
      color: '#faad14',
    },
    {
      title: '正在进行',
      value: 8,
      icon: <FileTextOutlined />,
      color: '#f5222d',
    },
  ];

  const recentUsers = [
    { id: 1, name: '张三', role: '管理员', status: 'ACTIVE' },
    { id: 2, name: '李四', role: '编辑', status: 'ACTIVE' },
    { id: 3, name: '王五', role: '查看者', status: 'INACTIVE' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>欢迎，{user?.realName || user?.username}👋</h1>
        <p>这是您的权限管理仪表板</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <Row align="middle">
                <Col flex="auto">
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    valueStyle={{ color: stat.color }}
                  />
                </Col>
                <Col>
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 最近用户 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="最近添加的用户"
            className="recent-users-card"
          >
            <List
              itemLayout="horizontal"
              dataSource={recentUsers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={`角色: ${item.role}`}
                  />
                  <Tag color={item.status === 'ACTIVE' ? 'green' : 'red'}>
                    {item.status === 'ACTIVE' ? '激活' : '禁用'}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 系统说明 */}
        <Col xs={24} lg={12}>
          <Card title="系统概述" className="system-info-card">
            <div className="system-info">
              <h3>RBAC权限管理系统</h3>
              <p>
                本系统提供完整的基于角色的访问控制（RBAC）功能，支持：
              </p>
              <ul>
                <li>用户管理和认证</li>
                <li>角色的创建和配置</li>
                <li>权限的精细化管理</li>
                <li>用户角色分配</li>
                <li>角色权限分配</li>
              </ul>
              <p style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
                💡 提示: 使用左侧菜单导航到不同的管理功能。
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

