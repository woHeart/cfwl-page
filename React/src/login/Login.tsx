import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import type { LoginRequest } from '@/api/user';
import { adminLogin } from '@/api/user';
import { useUserStore } from '@/store/userStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const onFinish = async (values: LoginRequest) => {
    try {
      const res = await adminLogin({ username: values.username, password: values.password });
      login(res)
      localStorage.setItem('token', res.token);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请检查账号和密码');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Admin</h2>
        <Form
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 360 }}
        >
          <Form.Item
            name="username"
            validateTrigger="onSubmit"
            rules={[
              { required: true, message: '请输入账号' },
              { min: 3, max: 12, message: '请检查账号' }
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger="onSubmit"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 8, max: 18, message: '请检查密码' }
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item style={{ marginTop: 26 }}>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
