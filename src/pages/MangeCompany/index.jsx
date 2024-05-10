import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Get } from "../../utils/requestFirebase";
import { Space, Table, Typography } from "antd";
import EditCompany from "../../components/EditCompany";
import DeleteCompany from "../../components/DeleteCompany";
const ManageCompany = () => {
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const respone = await Get("company");
      if (respone) {
        setCompany(respone);
      }
    };
    fetch();
  }, []);

  const items = company?.map((v) => ({
    key: v.id,
    id: v.id,
    companyName: v.companyName,
    phone: v.phone,
    email: v.email,
    address: v.address,
  }));

  const columns = [
    {
      key: "key",
      dataIndex: "key",
      title: "ID",
    },
    {
      key: "companyName",
      dataIndex: "companyName",
      title: "Company Name",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Address",
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <Space>
          <EditCompany items={record} />
          <DeleteCompany items={record} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }}>
        Quản lý công ty
      </Typography.Title>
      <Table dataSource={items} columns={columns} />
    </div>
  );
};

export default ManageCompany;
