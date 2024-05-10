import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { deleteUserCV } from "../../action/deleteUserCV";
function DeleteUser({ items }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    Modal.confirm({
      title: `Bạn có muốn xóa  không`,
      okText: "Có, vẫn xóa",
      cancelText: "Quay lại",
      content: "Bạn sẽ không thể khôi phục lại",
      async onOk() {
        setShow(true);
      },
    });
  };
  const handleCancel = () => {
    setShow(false);
  };

  const handleFinish = ({ name, password }) => {
    console.log(items.key);

    setLoading(true);
    setTimeout(() => {
      setShow(false);
      setLoading(false);
    }, 1500);
    setTimeout(() => {
      if (name === items.name && password === "admin") {
        dispatch(deleteUserCV(items.key));
        message.success("Xóa thành công");
        setTimeout(() => {
          // navigate(0);
          window.location.reload();
        }, 1300);
      } else {
        message.error("Sai thông tin xác nhận");
      }
    }, 1800);
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button danger onClick={handleDelete} icon={<AiOutlineDelete />}></Button>
      <Modal
        open={show}
        title="Nhập xác nhận"
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFinish}>
          <Form.Item
            label="Nhập tên"
            labelAlign="top"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your job's name!",
              },
            ]}
          >
            <Input placeholder={` Hãy nhập đúng ${items?.name}`} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <div
            className="button_modal"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "10px" }}
              loading={loading}
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default DeleteUser;
