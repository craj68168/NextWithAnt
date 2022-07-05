import React from 'react'
import { AuthContextProvider } from "../../context/AuthContext"
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from '../../node_modules/next/router';
import styled from "styled-components"
const Container = styled.div`
margin-top:50px;
text-align:center
`
const Login = () => {
  const { login } = AuthContextProvider()
 const router = useRouter()
  
  const onFinish = async (values: any) => {
    try {
      const data = await login(values.email, values.password);
      toast.success("Login Successfully")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Invalid Crediantial")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Container>
      <title>Login</title>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 1}}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </Container>
  )
}

export default Login