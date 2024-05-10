import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Get } from "../../utils/requestFirebase";
import { Row, Col, Card } from "antd";
import { ImListNumbered } from "react-icons/im";
import { IoNewspaperOutline } from "react-icons/io5";
import { BuildOutlined, UserAddOutlined } from "@ant-design/icons";
import ColumnChart from "../../components/ColumnChart";
const DashboardAdmin = () => {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [users, setUsers] = useState(null);
  const [cvs, setCvs] = useState(null);
  useEffect(() => {
    const fetchCompany = async () => {
      const response = await Get("company");
      if (response) {
        setCompany(response);
      }
    };
    const fetchJob = async () => {
      const response = await Get("jobs");
      if (response) {
        setJobs(response);
      }
    };
    const fetchUser = async () => {
      const response = await Get("applicant");
      if (response) {
        setUsers(response);
      }
    };
    const fetchCv = async () => {
      const response = await Get("cv");
      if (response) {
        setCvs(response);
      }
    };
    fetchUser();
    fetchCv();
    fetchCompany();
    fetchJob();
  }, []);
  console.log(cvs);
  console.log(users);
  console.log(company);
  console.log(jobs);

  return (
    <>
      {cvs?.length && users?.length && company?.length && jobs?.length && (
        <>
          {" "}
          <>
            <Row gutter={[20, 20]}>
              <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <Card>
                  <div className="jobs_number">
                    <div className="jobs_number_value">
                      <h3> {jobs.length} </h3>
                      <p> Jobs đang có </p>
                    </div>
                    <div className="jobs_number_img">
                      <ImListNumbered className="jobs_number-icon" />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <Card>
                  <div className="jobs_number">
                    <div className="jobs_number_value">
                      <h3> {cvs.length} </h3>
                      <p> Số lượng CV </p>
                    </div>
                    <div className="jobs_number_img">
                      <IoNewspaperOutline className="jobs_number-icon" />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <Card>
                  <div className="jobs_number">
                    <div className="jobs_number_value">
                      <h3> {company.length} </h3>
                      <p> Số lượng công ty </p>
                    </div>
                    <div className="jobs_number_img">
                      <BuildOutlined className="jobs_number-icon" />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <Card>
                  <div className="jobs_number">
                    <div className="jobs_number_value">
                      <h3> {company.length} </h3>
                      <p> Số lượng User </p>
                    </div>
                    <div className="jobs_number_img">
                      <UserAddOutlined className="jobs_number-icon" />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </>
          <div style={{ marginTop: "40px" }}>
            <ColumnChart
              jobsCount={jobs.length}
              cvsCount={cvs.length}
              companiesCount={company.length}
              usersCount={users.length}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardAdmin;
