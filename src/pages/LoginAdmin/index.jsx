import { Button, Col, Form, Input, Typography, message } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../SetCookie";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const handleFinish = function (e) {
    if (e.email === "admin@123" && e.password === "admin") {
      // alert("Login success")
      setCookie("admin", "admin", 1000, 1);
      setCookie("role", "admin", 1000, 1);
      message.success("Login success");
      setTimeout(() => {
        navigate("/dashboardA");
      }, 1200);
    } else {
      message.error("Login error");
    }
  };
  return (
    <>
      <Content style={{ padding: "48px" }}>
        <Typography.Title>Login Admin</Typography.Title>

        <Form onFinish={handleFinish}>
          <Col xxl={12} xl={10}>
            <Form.Item name={"email"} required>
              <Input placeholder="Enter your email" type="email" />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={10}>
            <Form.Item name={"password"} required>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {" "}
              Login{" "}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default LoginAdmin;
