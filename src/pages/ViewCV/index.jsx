import React, { useEffect, useState } from "react";
import { GetCookie } from "../../GetCookie";
import { getCvByUser } from "../../services/getCvByUser";
import { Get } from "../../utils/requestFirebase";
import { Button, Modal, Table } from "antd";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export const ViewCV = () => {
  const info = GetCookie("curr_user");
  const id = JSON.parse(info).id;
  const [data, setData] = useState(null);
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvResponse = await getCvByUser(id);
        if (cvResponse) {
          setData(cvResponse);
        }

        const jobResponse = await Get("jobs");
        if (jobResponse) {
          setJob(jobResponse);
        }

        const companyResponse = await Get("company");
        if (companyResponse) {
          setCompany(companyResponse);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id]);
  let jobDictionary = null;
  let companyDictionary = null;
  let enrichedCVs = null;
  if (data && job && company) {
    // Tạo từ điển mapping dựa trên id
    jobDictionary = job.reduce((acc, job) => {
      acc[job.id] = job;
      return acc;
    }, {});

    companyDictionary = company.reduce((acc, company) => {
      acc[company.id] = company;
      return acc;
    }, {});

    // Thêm thông tin công việc và công ty vào mỗi CV
    enrichedCVs = data.map((cv) => {
      const job = jobDictionary[cv.jobId || cv.idJob];
      const company = companyDictionary[cv.companyId || cv.idCompany];
      return {
        ...cv,
        jobName: job ? job.name : undefined,
        companyName: company ? company.companyName : undefined,
      };
    });
  }
  const items =
    enrichedCVs &&
    enrichedCVs.map((cv, index) => ({
      key: index + 1,
      jobName: cv.jobName,
      companyName: cv.companyName,
      fileCv: cv.link ?? "",
      createdAt: cv.createAt,
      description: cv.introduction ?? "",
      email: cv.email,
      phone: cv.phone,
      name: cv.name,
      jobId: cv.jobId,
      companyId: cv.companyId,
    }));
  console.log(items);
  const column = [
    {
      key: "jobName",
      dataIndex: "jobName",
      title: "Tên công việc",
      render: (_, record) => (
        <Link to={"/jobs/" + record.jobId}> {record.jobName} </Link>
      ),
    },
    {
      key: "companyName",
      dataIndex: "companyName",
      title: "Tên công ty",
      render: (_, record) => (
        <Link to={"/company/" + record.companyId} style={{ color: "#000" }}>
          {" "}
          {record.companyName}{" "}
        </Link>
      ),
    },
    {
      key: "fileCv",
      dataIndex: "fileCv",
      title: "Link File",
      render: (text) => <a href={text}> Link CV nộp</a>,
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Nộp vào lúc",
      render: (time) => format(time, "dd/MM/yyyy hh:mm a", { locale: vi }),
    },
    {
      key: "action",
      title: "Xem thông tin",
      render: (record) => (
        <Button
          type="primary"
          shape="circle"
          icon={<EyeOutlined />}
          onClick={() =>
            handleViewInfo(
              record.name,
              record.phone,
              record.email,
              record.description
            )
          }
        ></Button>
      ),
    },
  ];
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);
  const handleViewInfo = (name, phone, email, description) => {
    // Implement your logic to display the information
    // You can replace console.log with your desired action, like opening a modal
    setModalContent(
      <div>
        <h2>Thông Tin Đã Ứng tuyển</h2>
        <p>
          <b>Tên:</b> {name}
        </p>
        <p>
          <b>Số điện thoại:</b> {phone}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>Thư Giới thiệu:</b> {description}
        </p>
      </div>
    );
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false); // Close the modal
  };
  const modal = modalContent && (
    <Modal
      centered
      onOk={() => setOpen(false)}
      open={open}
      onCancel={handleCancel}
    >
      {modalContent}
    </Modal>
  );
  return (
    <>
      <Table columns={column} dataSource={items}></Table>
      {modalContent && modal}
    </>
  );
};
