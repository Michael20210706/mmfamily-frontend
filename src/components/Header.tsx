import React from 'react';
import { Dropdown, Avatar, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const menuItems: any[] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      handleLogout();
    }
  };

  return (
    <div className="header">
      <div className="header-title">
        <h1>🔐 RBAC权限管理系统</h1>
      </div>
      <div className="header-user">
        <Dropdown
          menu={{ items: menuItems, onClick: (e) => handleMenuClick(e.key) }}
          placement="bottomRight"
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span>{user?.realName || user?.username}</span>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;

