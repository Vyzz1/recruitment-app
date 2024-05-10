import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Input,
  Modal,
  Row,
  Form,
  DatePicker,
  message,
} from "antd";
import { GetCookie } from "../../GetCookie";
import { deepEqual } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../../action/update";
import { Get } from "../../utils/requestFirebase";
const UserInformation = () => {
  const info = GetCookie("curr_user");
  const email = JSON.parse(info).id;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Get("applicant");
      if (response) {
        setData(response.filter((user) => user.id === email)[0]);
      }
    };
    fetchData();
  }, [email]);
  console.log(data);
  const [open, setOpen] = useState(false);
  const [load, setLoading] = useState(false);
  const handleCancle = () => {
    setOpen(false);
    SetChangePwd(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOk = () => {
    setLoading(true);

    const values = form.getFieldsValue();
    const filteredObject = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    const { id, token, role, ...filteredData } = data;
    console.log(filteredObject);
    setTimeout(() => {
      if (deepEqual(filteredObject, filteredData)) {
        message.info("Nothing changed");
      } else {
        dispatch(update("applicant", filteredObject, data.id - 1));
        message.success("Sửa thành công");
        setTimeout(() => {
          navigate(0);
        }, 1500);
      }
      setLoading(false);
      setOpen(false);
    }, 2500);
  };

  const [form] = Form.useForm();
  const onchange = (_, dateString) => {
    form.setFieldsValue({ dateOfBirth: dateString });
  };

  const handleChangePwd = () => {
    let values = form2.getFieldsValue();

    if (
      !values.old_password ||
      !values.new_password ||
      !values.again_password
    ) {
      message.error("Vui lòng nhập đủ thông tin");
      return;
    } else if (values.old_password !== data.password) {
      message.error("Mật khẩu cũ không đúng");
      return;
    } else if (values.new_password === data.password) {
      message.error("Mật khẩu mới không được trùng với mật khẩu cũ");
      return;
    } else if (values.new_password !== values.again_password) {
      message.error("Mật khẩu mới không khớp");
      return;
    } else {
      message.success("Đổi mật khẩu thành công");
      dispatch(
        update("applicant", { password: values.new_password }, data.id - 1)
      );
      setTimeout(() => {
        navigate(0);
      }, 1500);
    }
  };
  const [form2] = Form.useForm();
  const [changePwd, SetChangePwd] = useState(false);

  return (
    <>
      {data && (
        <Row
          gutter={[20, 20]}
          style={{ marginBottom: "25px", padding: "20px" }}
        >
          <Descriptions
            size="default"
            title="Thông tin tài khoản"
            layout="vertical"
          >
            <Descriptions.Item label="ID">
              {data.id ?? "Chưa có"}
            </Descriptions.Item>
            <Descriptions.Item label="Tên">{data.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {data.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tháng năm sinh">
              {data.dateOfBirth ?? "Chưa có"}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {data.address ?? "Chưa có"}
            </Descriptions.Item>
          </Descriptions>
        </Row>
      )}
      <Button onClick={() => setOpen(true)} type="primary">
        Sửa thông tin
      </Button>
      <Button
        onClick={() => SetChangePwd(true)}
        style={{ marginLeft: "15px" }}
        danger
      >
        Đổi mật khẩu
      </Button>
      {data && (
        <Modal
          confirmLoading={load}
          onOk={handleOk}
          centered
          title="Sửa thông tin"
          open={open}
          onCancel={handleCancle}
        >
          <Form initialValues={data} form={form}>
            <Form.Item label="Tên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item hidden name="dateOfBirth">
              <Input />
            </Form.Item>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker onChange={onchange} />
            </Form.Item>
          </Form>
        </Modal>
      )}
      {data && (
        <Modal
          open={changePwd}
          onCancel={handleCancle}
          centered
          onOk={handleChangePwd}
          title="Đổi mật khẩu"
          okButtonProps={({ type: "submit" }, { danger: true })}
        >
          <Form form={form2}>
            <Form.Item name="old_password" label="Mật khẩu cũ">
              <Input.Password placeholder="Mật khẩu cũ" />
            </Form.Item>
            <Form.Item name="new_password" label="Mật khẩu mới">
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              dependencies={["new_password"]}
              name="again_password"
              label="Xác nhận mật khẩu mới"
            >
              <Input.Password placeholder="Mật khẩu cũ" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default UserInformation;
