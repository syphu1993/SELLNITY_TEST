'use client';
import { Button, Form, Input } from 'antd';
import { login } from '@/features/auth/authService';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCurrentUser } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const onFinish = async (values: {username: string, password: string}) => {
    try {
      const data: User = await login(values.username, values.password);
      dispatch(setCurrentUser(data));
      route.push('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
