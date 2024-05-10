import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Get } from "../../utils/requestFirebase";
import EditUser from "../../components/EditUser";
import DeleteUser from "../../components/DeleteUser";

const ManageUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      let respone = await Get("applicant");
      if (respone) {
        setUser(respone);
      }
    };
    fetch();
  }, []);
  const items =
    user &&
    user.map((v) => ({
      key: v.id,
      id: v.id,
      name: v.name,
      email: v.email,
      phone: v.phone,
      dateOfBirth: v.dateOfBirth ?? "",
      address: v.address ?? "",
    }));
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Số điện thoại",
    },
    {
      key: "dateOfBirth",
      dataIndex: "dateOfBirth",
      title: "Ngày sinh",
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Địa chỉ",
    },
    {
      key: "action",
      title: "Action",
      render: (text, record) => (
        <Space>
          <EditUser items={record} />
          <DeleteUser items={record} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Typography.Title style={{ textAlign: "center" }}>
        Quản Lý Người Dùng
      </Typography.Title>
      <div>
        <Table dataSource={items} columns={columns}>
          {" "}
        </Table>
      </div>
    </div>
  );
};

export default ManageUser;
