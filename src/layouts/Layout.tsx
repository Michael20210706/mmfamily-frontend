import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout className="app-layout">
      <Header />
      <Layout className="layout-body">
        <Layout.Sider width={250} className="layout-sider">
          <Sidebar />
        </Layout.Sider>
        <Layout.Content className="layout-content">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

