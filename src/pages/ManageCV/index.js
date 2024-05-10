import { Button, Col, Row, Space, Table } from "antd";
import { GetCookie } from "../../GetCookie";
import { getCVByCompany } from "../../services/getCVByCompany";
import { useState, useEffect } from "react";
import Title from "antd/es/typography/Title";
import { AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";
import { Get } from "../../utils/requestFirebase";
import { DeleteOutlined } from "@ant-design/icons";
function ManageCv() {
  const id = JSON.parse(GetCookie("info")).id;
  const [cv, setCV] = useState(null);
  const [job, setJob] = useState(null);
  useEffect(() => {
    const fetchCv = async () => {
      const response = await getCVByCompany(id);
      if (response) {
        setCV(response);
      }
    };
    const fetchJob = async () => {
      const response = await Get("jobs");
      if (response) {
        setJob(response);
      }
    };
    fetchJob();
    fetchCv();
  }, [id]);

  const jobMap = new Map(
    job
      ?.filter((job) => job && job.id !== undefined)
      .map((job) => [job.id, job]) ?? []
  );
  const updatedCvs = cv?.map((cvItem) => {
    console.log("Processing CV item:", cvItem);
    const jobInfo = jobMap.get(cvItem.jobId);
    console.log("Job info found:", jobInfo);
    return jobInfo
      ? { ...cvItem, jobName: jobInfo.name, jobSalary: jobInfo.salary }
      : cvItem;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVisitCV = (id) => {
    console.log(id);
    navigate(`/admin/cv/${id}`);
    // let body = {
    //   statusRead: true,
    // };
    // dispatch(update("cv", body, id - 1));
  };

  const deleteCV = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa CV này không?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(update("cv", { deletedAdmin: true }, id - 1));
        setTimeout(() => {
          Swal.fire("Xóa thành công", "", "success");
        }, 1000);
        setTimeout(() => {
          navigate(0);
        }, 1200);
      }
    });
  };
  const items =
    updatedCvs &&
    updatedCvs.map((cv, index) => {
      return {
        key: index + 1,
        id: cv.id,
        jobId: cv.jobId,
        jobName: cv.jobName,
        name: cv.name,
        userId: cv.idUser,
        link: cv.link,
        createAt: cv.createAt,
      };
    });
  const column = [
    {
      key: "id",
      dataIndex: "id",
      title: "Mã CV",
    },
    {
      key: "createAt",
      dataIndex: "createAt",
      title: "Thời gian nộp",
      render: (e) => format(e, "dd/MM/yyyy hh:mm a"),
    },
    {
      key: "jobName",
      dataIndex: "jobName",
      title: "Tên công việc",
    },
    {
      key: "userId",
      dataIndex: "userId",
      title: "Mã ứng viên",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên ứng viên",
    },

    {
      key: "link",
      dataIndex: "link",
      title: "Link CV",
      render: (e) => (
        <a href={e} target="blank">
          Link
        </a>
      ),
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Hành động",
      render: (_, record) => (
        <>
          <Space>
            <Button
              icon={<AiOutlineEye />}
              onClick={() => handleVisitCV(record.id)}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => deleteCV(record.id)}
            ></Button>
          </Space>
        </>
      ),
    },
  ];
  // console.log(updatedCvs);
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        {" "}
        TRANG QUẢN LÝ CV
      </Title>
      <Row>
        <Col xl={24}>
          <Table dataSource={items} columns={column} />
        </Col>
      </Row>
    </>
  );
}
export default ManageCv;
