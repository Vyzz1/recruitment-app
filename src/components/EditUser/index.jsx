import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, message } from "antd";
import React, { useState } from "react";
import { deepEqual } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";

const EditUser = ({ items }) => {
  const handleClick = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  let id = items.key;
  delete items.id;
  delete items.dateOfBirth;
  console.log(id);
  const cleanValues = (values) => {
    let cleaned = {};
    Object.keys(values).forEach((key) => {
      if (values[key] !== "" && values[key] !== undefined) {
        cleaned[key] = values[key];
      }
    });
    return cleaned;
  };

  const dispatch = useDispatch();
  const handleFinish = (values) => {
    const cleanedValues = cleanValues(values);
    if (deepEqual(items, cleanedValues) || deepEqual(cleanedValues, items)) {
      message.info("Nothing changed");
    } else {
      dispatch(update("applicant", cleanedValues, id - 1));
      message.info("Updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };
  return (
    <>
      {" "}
      <Button icon={<EditFilled />} onClick={handleClick}></Button>
      <Modal
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        title="Sủa thông tin"
        open={open}
      >
        <Form onFinish={handleFinish} layout="vertical" initialValues={items}>
          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[
              { required: true, message: "Please input the user's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Please input the phonenumber!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Đổi Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Row justify={"end"}>
            <Button onClick={() => setOpen(false)}> Thoát</Button>
            <Button
              style={{ marginLeft: "9px" }}
              type="primary"
              htmlType="submit"
            >
              {" "}
              Sửa
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditUser;
