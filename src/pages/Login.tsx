import React, { useState } from 'react';
import { Form, Input, Button, Card, Message, Spin, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import httpClient from '../config/axiosConfig';
import { USER_API } from '../config/api';
import { LoginRequest, LoginResponse } from '../types';
import './Login.css';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    try {
      setLoading(true);
      setError('');

      const response = await httpClient.post<LoginResponse>(USER_API.login, values);

      if (response.data) {
        const { token, user } = response.data;
        setAuth(user, token);
        navigate('/');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || '登录失败，请检查用户名和密码';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1>🔐 RBAC权限管理系统</h1>
          <p>登录到您的账户</p>
        </div>

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <p>演示账户: admin / admin123</p>
          <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
            需要Spring Cloud后端服务支持
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;

