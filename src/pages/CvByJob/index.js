import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCvByJobs } from "../../services/getCvByJobs";
import { Button, Col, Row, Space, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import AiOutlineEye, { DeleteFilled } from "@ant-design/icons";
import { update } from "../../action/update";
import { format } from "date-fns";
import Swal from "sweetalert2";

function CvByJob() {
  const { id } = useParams();
  const [cv, setCv] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCvByJobs(id);
      if (response) {
        setCv(response);
      }
    };
    fetch();
  }, [id]);
  const filtersId = cv
    ?.map((value) => ({
      text: value.idJob,
      value: value.idJob,
    }))
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex((t) => t.text === item.text && t.value === item.value)
      );
    });
  const handleDelete = function (id) {
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
  const dataSource = cv?.map((cv) => ({
    name: cv.name,
    phone: cv.phone,
    email: cv.email,
    createAt: cv.createAt,
    status: cv.statusRead,
    idJob: cv.jobId,
    id: cv.id,
    key: Math.random() * 1000,
  }));
  const columns = [
    {
      title: "Id Job",
      dataIndex: "idJob",
      key: "idJob",
      filters: filtersId,

      onFilter: (value, record) => {
        // Convert the string value to a number
        const numericValue = parseInt(value);

        // Check if idJob is an array and includes the numericValue
        if (Array.isArray(record?.jobId)) {
          return record.jobId.includes(numericValue);
        }

        // Otherwise, check if jobId is a number and equal to numericValue
        return record?.jobId === numericValue;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
      sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
      render: (a) => format(a, "dd/MM/yyyy HH:mm a "),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="small">
            <Button
              icon={
                <>
                  <AiOutlineEye />
                </>
              }
              onClick={() => handleVisitCV(record?.id)}
            >
              {" "}
              Chi tiết{" "}
            </Button>
            <Button
              onClick={() => handleDelete(record?.id)}
              icon={<DeleteFilled />}
              danger
            ></Button>
          </Space>
        </>
      ),
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVisitCV = (id) => {
    navigate(`/admin/cv/${id}`);
    let body = {
      statusRead: true,
    };
    dispatch(update("cv", body, id - 1));
  };
  return (
    <>
      <Title>Lọc CV Theo Job</Title>{" "}
      <Row>
        <Col xl={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </>
  );
}

export default CvByJob;
