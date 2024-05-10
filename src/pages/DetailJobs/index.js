import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetails } from "../../services/getJobDetails";
import { GetCookie } from "../../GetCookie";

import { Button, Col, Row, Tag, Image, Descriptions, message } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { getCompanyDetails } from "../../services/getCompanyDetails";
import ReactCountryFlag from "react-country-flag";
import { color } from "../../utils/color";
import { getRandomItemsFromArray } from "../../helpers/helpers";
import "./DetailJobs.scss";
import imageCompany from "../../images/hands-1063442_960_720.jpg";
import { TbWorldWww } from "react-icons/tb";
import ApplyJobModal from "../../components/ApplyJobModal";
function DetailJobs() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await getJobDetails(id);
      if (response) {
        setData(response[0]);
      }
    };
    fetch();
  }, [id]);
  const [company, setCompany] = useState([]);
  const info = GetCookie("curr_user");
  const userId = info && JSON.parse(info).id;
  useEffect(() => {
    if (data) {
      const fetch = async () => {
        const response = await getCompanyDetails(data.idCompany);
        if (response) {
          setCompany(response[0]);
        }
      };
      fetch();
    }
  }, [data.idCompany, data]);
  let randomColors = getRandomItemsFromArray(color, 5);
  let infoCompany;
  let span = 2;
  let idJob = parseInt(id);

  if (company) {
    infoCompany = (
      <Descriptions layout="vertical">
        <Descriptions.Item label="Telephone" span={span}>
          {company.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{company.address}</Descriptions.Item>
        <Descriptions.Item label="Giờ làm việc" span={span}>
          {company.workingTime}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
      </Descriptions>
    );
  }

  const navigate = useNavigate();
  const handleVisit = function (id) {
    navigate("/company/" + id);
  };

  const handleApplyNow = () => {
    if (userId) setOpen(true);
    else {
      message.info("Vui lòng đăng nhập ");
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      {data && (
        <Row gutter={[20, 20]}>
          <Col xl={16} xs={24}>
            <div className="box1">
              <div className="jobs_detail">
                <div className="jobs_detail__container">
                  <h3> {data.name} </h3>
                  <div className="jobs_detail__location">
                    <IoLocationOutline className="icon_location" />
                    {Array.isArray(data.city) ? (
                      <span className="span_city">{data.city.join(" - ")}</span>
                    ) : (
                      <span className="span_city">{data.city}</span>
                    )}
                  </div>
                  <div className="jobs__salary">
                    Up to $ <span>{data.salary}</span>
                  </div>
                  <div className="jobs_detail_button">
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleApplyNow}
                    >
                      {" "}
                      Ứng tuyển ngay{" "}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="jobs-company">
                <div className="jobs-company__container">
                  <div className="jobs-company__location">
                    <IoLocationOutline className="icon_location" />
                    {company && <span> {company.address} </span>}
                  </div>
                  <div className="jobs-company__nation">
                    <ReactCountryFlag countryCode="VN" svg />
                    <span> Việt Nam</span>
                  </div>
                  <div className="jobs-company__posted">
                    {" "}
                    Posted in {data.createAt}
                  </div>
                  <div className="jobs-company__skills">
                    <span> Skill required : </span>
                    {data && data.tags ? (
                      data.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          color={randomColors[index]}
                          className="tag"
                        >
                          {tag}
                        </Tag>
                      ))
                    ) : (
                      <span>No skills available.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="jobs__info">
                {data && data.description ? (
                  data.description
                    .split("\n")
                    .map((item, key) => <p key={key}>{item}</p>)
                ) : (
                  <p>Loading description...</p>
                )}
              </div>
            </div>
          </Col>
          <Col xl={8} xs={24}>
            {company ? (
              <>
                {" "}
                <div className="box2">
                  <div className="company">
                    <Row>
                      <div className="company__img">
                        <Image src={imageCompany} />
                      </div>
                      <div className="company__wrapper">
                        <div className="company__name">
                          {company.companyName}
                        </div>
                        <Button onClick={() => handleVisit(company.id)}>
                          {" "}
                          Visit us now
                        </Button>
                      </div>
                    </Row>

                    <div className="company__website">
                      <TbWorldWww className="company__website-icon" />
                      <span> Our Website </span>
                    </div>

                    <hr></hr>
                    <Row>
                      <div className="company__info">{infoCompany}</div>
                    </Row>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      )}
      {data && company && (
        <ApplyJobModal
          open={open}
          setOpen={setOpen}
          companyId={company.id}
          jobId={idJob}
          userId={userId}
        />
      )}
    </>
  );
}
export default DetailJobs;
