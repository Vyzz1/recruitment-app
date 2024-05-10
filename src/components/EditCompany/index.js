import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, message } from "antd";
import React, { useState } from "react";
import { deepEqual } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";

const EditCompany = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = {
    onCancel: () => setOpen(false),
    open: open,
    title: "Sửa công ty",
    footer: null,
    center: true,
  };
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
  let id = items.key;

  delete items.id;
  const handleFinish = (values) => {
    setLoading(true);
    const cleanedValues = cleanValues(values);
    if (deepEqual(items, cleanedValues) || deepEqual(cleanedValues, items)) {
      message.info("Nothing changed");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      dispatch(update("company", cleanedValues, id - 1));
      message.info("Updated company successfully");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<EditFilled />}
        type="primary"
      ></Button>
      <Modal {...props}>
        <Form onFinish={handleFinish} layout="vertical" initialValues={items}>
          <Form.Item label="Tên công ty" name={"companyName"} required>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name={"phone"} required>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name={"email"} required>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name={"address"} required>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Đổi mật khẩu" name={"password"} required>
            <Input.Password />
          </Form.Item>
          <Row align={"end"}>
            <Button
              onClick={() => setOpen(false)}
              style={{ marginRight: "12px" }}
            >
              Thoát
            </Button>
            <Button loading={loading} htmlType="submit" type="primary">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditCompany;
