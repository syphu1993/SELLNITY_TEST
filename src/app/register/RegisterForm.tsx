'use client'; 
import { Button, Input, Form } from "antd";

export default function RegisterForm() {
  const onFinish = (values: {username: string, password: string}) => {
    console.log("Form values:", values);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-96 p-6 shadow-md rounded-lg border">
        <Form
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
