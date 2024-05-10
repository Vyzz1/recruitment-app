import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { GiThreeLeaves } from "react-icons/gi";

import {
  Button,
  Modal,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Typography,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { createCV } from "../../action/createCV";
import { GetLength } from "../../utils/GetLength";

const { Dragger } = Upload;

const ApplyJobModal = ({ companyId, setOpen, open, jobId, userId }) => {
  const [length, setLength] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await GetLength("cv");
      if (response) {
        setLength(response);
      }
    };
    fetch();
  }, []);
  console.log(length);
  async function postFile(postData) {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzYJEDDeq_8ZKkCglgEF9EmqqhLBcCFqxm36QCut-d6bbybXc5Ijnj7If9ChwLZG6dP/exec",
        {
          method: "POST",
          body: JSON.stringify(postData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      alert("Vui lòng thử lại");
    }
  }
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const [button, setButton] = useState("Ứng tuyển");
  const dipatch = useDispatch();
  const [form] = Form.useForm();

  const handleFinish = (e) => {
    setButton("Đang tải file ...");
    // console.log(e);
    setLoading(true);
    let info = e.file;
    let { file, ...data } = e;
    if (info.file.status === "done") {
      const fileReader = new FileReader();
      // Khi đọc file hoàn tất
      fileReader.onload = async () => {
        const base64 = fileReader.result;
        const postData = {
          name: info.file.name,
          type: info.file.type,
          data: base64.split(",")[1],
        };
        let response = await postFile(postData);
        if (response) {
          setLoading(false);
          data = {
            ...data,
            link: response.view,
            jobId: jobId,
            companyId: companyId,
            createAt: Date.now(),
            statusRead: false,
            idUser: userId,
            deletedAdmin: false,
          };

          dipatch(createCV(data, length));
          form.resetFields();
          message.success("Ứng tuyển thành công");
          setOpen(false);
          setButton("Ứng tuyển");
        }
      };
      fileReader.readAsDataURL(info.file.originFileObj);
    }
  };

  const text = (
    <Typography.Text
      type="success"
      style={{ fontWeight: "600", fontSize: "20px" }}
    >
      {" "}
      <GiThreeLeaves /> Thư giới thiệu{" "}
    </Typography.Text>
  );

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        // okButtonProps={{ htmlType: "submit" }}
        footer={null}
        centered
        title="Ứng tuyển công việc"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item
            name="file"
            rules={[{ required: true, message: "Vui lòng tải file lên" }]}
          >
            <Dragger
              showUploadList={true}
              previewFile={false}
              customRequest={dummyRequest}
              action={null}
              maxCount={1}
              accept=".pdf"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Chọn file cv để upload hoặc kéo thả file
              </p>
              <p className="ant-upload-hint">
                Chỉ hỗ trợ file pdf. CV xin việc làm với định dạng là pdf phổ
                biến nhất
              </p>
            </Dragger>
          </Form.Item>

          <Typography.Text type="danger">Dấu (*) là bắt buộc</Typography.Text>
          <Form.Item
            name="name"
            label="Họ và tên"
            required
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
          >
            <Input size="large" placeholder="Họ và tên hiển thị với NTD" />
          </Form.Item>
          <Row gutter={[5]}>
            <Col xl={12}>
              <Form.Item
                name="email"
                label="Email"
                required
                rules={[
                  { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
                ]}
              >
                <Input size="large" placeholder="Email hiển thị với NTD" />
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                required
                rules={[
                  { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Số điện thoại hiển thị với NTD"
                />
              </Form.Item>
            </Col>
          </Row>
          {text}
          <Form.Item name="introduction">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row justify={"end"}>
            <Button
              style={{ marginRight: "8px" }}
              onClick={() => setOpen(false)}
            >
              Thoát
            </Button>
            <Button loading={loading} htmlType="submit" type="primary">
              {button}
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ApplyJobModal;
