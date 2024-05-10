import { Button, Col, Form, Input, Row, Typography, notification } from "antd";
import React, { useState, useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { Get } from "../../utils/requestFirebase";
import { setCookie } from "../../SetCookie";
const LoginUser = () => {
  const contextValue = {
    name: "Default",
  };
  const Context = React.createContext({
    name: "Default",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (str) => {
    api[str.icon]({
      message: str.message,
      description: str.description,
      placement: "topRight",
    });
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Get("applicant");
      if (response) {
        setData(response);
      }
    };
    fetchUsers();
  }, []);
  console.log(data);
  const onFinish = (e) => {
    let { email, password } = e;
    const user = data.filter(
      (user) => user.email === email && user.password === password
    );
    let currentUser = user[user.length - 1];

    // Destructuring currentUser to exclude the password and get the rest of the properties

    if (user.length > 0) {
      let { password: excludedPassword, ...infoWithoutPassword } = currentUser;
      // Use infoWithoutPassword which doesn't include the password
      let info = { ...infoWithoutPassword };
      setCookie("token", currentUser.token, 1000, 1);
      setCookie("role", currentUser.role, 1000, 1);
      setCookie("curr_user", JSON.stringify(info), 1000, 1);
      let str = {
        message: "Đăng nhập thành công",
        description: "Chúc mừng bạn đã đăng nhập thành công",
        icon: "success",
      };
      openNotification(str);
      navigate("/");
    } else {
      let str = {
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu sai",
        icon: "error",
      };
      openNotification(str);
    }
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Content>
          <Typography.Title style={{ textAlign: "center" }}>
            Đăng Nhập
          </Typography.Title>
          <Row
            style={{ marginTop: "50px" }}
            justify={"center"}
            align={"center"}
          >
            <Col xxl={12} xl={8}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Email!",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Link to={"forgot"}>Quên mật khẩu</Link>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
                Hoặc <Link to={"/registeruser"}>Đăng ký ngay!</Link>
              </Form>
            </Col>
          </Row>
        </Content>
      </Context.Provider>
    </>
  );
};

export default LoginUser;
