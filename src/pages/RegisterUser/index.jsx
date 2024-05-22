import React, { useState, useEffect } from "react";
import { LinearGradient } from "react-text-gradients";

import { Col, Input, Row, Button, notification, Form } from "antd";
import { Get } from "../../utils/requestFirebase";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import "./LoginUser.css";
import { useDispatch } from "react-redux";
import { GetLength } from "../../utils/GetLength";
import { createApplicant } from "../../action/createApplicant";
import RandomString from "../../helpers/RandomString";
const { Title } = Typography;
export const RegisterUser = () => {
  const [applicant, setApplicant] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const respone = await Get("applicant");
      if (respone) {
        setApplicant(respone);
      }
    };
    fetch();
  }, []);
  console.log(applicant);
  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      const response = await GetLength("applicant");
      if (response) {
        setLength(response);
      }
    };
    fetch();
  }, []);
  const contextValue = {
    name: "Default",
  };
  const Context = React.createContext({
    name: "Default",
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (str) => {
    api[str.icon]({
      message: str.message,
      description: str.description,
      placement: "topRight",
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = (e) => {
    const { email } = e;
    const checkEmail = applicant.find((item) => item.email === email);
    if (checkEmail) {
      let str = {
        message: "Tạo tài khoản thất bại",
        description: "Email đã tồn tại trong hệ thống",
        icon: "error",
      };
      openNotification(str);
    } else {
      dispatch(
        createApplicant({ ...e, token: RandomString(20), role: "user" }, length)
      );
      let str = {
        message: "Tạo tài khoản thành công",
        description: "Chúc mừng bạn đã tạo tài khoản thành công",
        icon: "success",
      };

      openNotification(str);
      setTimeout(() => {
        navigate("/loginuser");
      }, 2000);
    }
  };

  const [form] = Form.useForm();
  const validatePasswords = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Mật khẩu không khớp!"));
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="container">
          <div className="innerbox">
            <Form form={form} onFinish={handleFinish} autoComplete="false ">
              <div className="box_head">
                <div className="title">
                  <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                    TRANG ĐĂNG KÝ
                  </LinearGradient>
                </div>
              </div>
              <Row gutter={[10, 10]}>
                <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Email
                  </Title>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email" },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
                <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Họ và tên
                  </Title>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name" },
                    ]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Số điện thoại
                  </Title>
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please input your email" },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
                <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Mật khẩu
                  </Title>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please input your password" },
                    ]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Nhâp lại Mật khẩu
                  </Title>
                  <Form.Item
                    dependencies={["password"]}
                    name="password_again"
                    rules={[
                      {
                        required: true,
                        message: "Please re-type your password",
                      },
                      { validator: validatePasswords },
                    ]}
                  >
                    <Input.Password placeholder="Re-type your password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"end"} gutter={[10, 10]}>
                <Col xxl={6} xl={6} lg={24} md={12} sm={24} xs={24}>
                  <Form.Item>
                    <Button style={{ width: "100%" }} htmlType="reset">
                      Nhập lại
                    </Button>
                  </Form.Item>
                </Col>
                <Col xxl={6} xl={6} lg={24} md={12} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Đăng ký
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Context.Provider>
    </>
  );
};
export default RegisterUser;
