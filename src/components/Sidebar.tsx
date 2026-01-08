import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/roles',
      icon: <TeamOutlined />,
      label: '角色管理',
    },
    {
      key: '/permissions',
      icon: <LockOutlined />,
      label: '权限管理',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <div className="sidebar">
      <Menu
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        onClick={(e) => handleMenuClick(e.key)}
        style={{ borderRight: 'none' }}
      />
    </div>
  );
};

export default Sidebar;

