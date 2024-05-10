import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCvDetails } from "../../services/getCvDetails";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Card,
  Descriptions,
  Divider,
  Row,
  Col,
  Tag,
  Button,
  Modal,
} from "antd";
import "./DetailCv.css";
import { getJobDetails } from "../../services/getJobDetails";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";
function DetailCv() {
  const { id } = useParams();
  const [cv, setCv] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCvDetails(id);
      if (response) {
        setCv(response[0]);
      }
    };
    fetch();
  }, [id]);

  const [job, setJob] = useState([]);
  let idJob = cv?.jobId;

  useEffect(() => {
    const fetch = async () => {
      const response = await getJobDetails(idJob);
      if (response) {
        setJob(response[0]);
      }
    };
    fetch();
  }, [idJob]);
  const [show, setShow] = useState(false);
  const handleShowModal = () => {
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return format(date, "dd/MM/yyyy hh:mm a", { locale: vi });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
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
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        {" "}
        Chi tiết CV
      </Title>
      {cv && job && (
        <Row gutter={[20, 20]}>
          <Col xl={16}>
            <Divider orientation="left">
              <p style={{ color: "red", fontSize: "20px" }}>
                Thông tin ứng viên
              </p>
            </Divider>
            <Card>
              <Descriptions layout="vertical">
                <Descriptions.Item label="Mã ứng viên">
                  {cv?.idUser}
                </Descriptions.Item>
                <Descriptions.Item label="Tên ứng viên">
                  <b style={{ fontWeight: "600" }}>{cv?.name} </b>
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {cv?.phone}
                </Descriptions.Item>

                <Descriptions.Item label="Email">{cv?.email}</Descriptions.Item>
                <Descriptions.Item label="Gửi vào lúc">
                  {cv?.createAt ? formatDate(cv.createAt) : ""}
                </Descriptions.Item>
                <Descriptions.Item label="Link CV">
                  {" "}
                  <a href={cv?.link} target="_blank" rel="noreferrer">
                    {" "}
                    Link{" "}
                  </a>{" "}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Divider orientation="left">
              <p style={{ color: "red", fontSize: "20px" }}>
                Giới thiệu bản thân
              </p>
            </Divider>
            <Card>
              <p>{cv?.introduction}</p>
            </Card>
          </Col>
          <Col xl={8} sm={24} xs={24}>
            <div className="job_wrapper">
              <Divider>
                <p style={{ color: "#437ae9", fontSize: "20px" }}>
                  Thông tin job ứng tuyển
                </p>
              </Divider>
              <Card>
                <Title level={4}> {job?.name}</Title>
                <p>
                  {" "}
                  Salary $<b>{job?.salary}</b>{" "}
                </p>

                <div className="jobs-company__skills">
                  <span> Tags : </span>
                  {job?.tags?.map((tag, index) => (
                    <Tag key={index} className="tag">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="city" style={{ margin: "15px 0" }}>
                  <span> City : </span>
                  {job?.city?.map((tag, index) => (
                    <Tag color="blue" key={index} className="tag">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <Button type="primary" size="middle" onClick={handleShowModal}>
                  {" "}
                  Xem mô tả job
                </Button>
                <Modal
                  centered
                  open={show}
                  onCancel={handleCloseModal}
                  footer={null}
                >
                  <Divider> Mô tả</Divider>
                  <Card>
                    <div className="card_description">{job?.description}</div>
                  </Card>
                  <div
                    className="button_modal"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      margin: "20px 0 0",
                    }}
                  >
                    <Button onClick={handleCloseModal}>Đóng</Button>
                  </div>
                </Modal>
              </Card>
            </div>
          </Col>
          <Button
            onClick={() => handleDelete(cv?.id)}
            danger
            icon={<DeleteOutlined />}
          >
            Xóa{" "}
          </Button>
        </Row>
      )}
    </>
  );
}
export default DetailCv;
