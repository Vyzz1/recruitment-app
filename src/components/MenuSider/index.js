import { Menu, Modal, Tooltip } from "antd";
import {
  DashboardOutlined,
  SettingFilled,
  AntDesignOutlined,
  BankOutlined,
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  EyeFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { GetCookie } from "../../GetCookie";
import { IoHomeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Get } from "../../utils/requestFirebase";
import { RiBuilding4Fill, RiDashboard2Fill } from "react-icons/ri";
import { ImUser } from "react-icons/im";
function MenuSider() {
  const navigate = useNavigate();
  const handleDelete = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "curr_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };
  let items = [];
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("company");
      if (response) {
        setCompany(response);
      }
    };
    fetch();
  }, []);
  const [city, setCity] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("city");
      if (response) {
        setCity(response);
      }
    };
    fetch();
  }, []);
  const cityName = city?.filter((_, i) => i > 0);
  const token = GetCookie("role");
  if (token === "com") {
    items = [
      {
        key: "/",
        icon: <DashboardOutlined />,
        label: <Link to={"/dashboard"}>Dashboard</Link>,
      },
      {
        key: "settings",
        icon: <SettingFilled />,
        label: "Settings",
        children: [
          {
            key: "company",
            icon: <BankOutlined />,
            label: <Link to={"setting/company"}>Setting Company</Link>,
          },
          {
            key: "jobs",
            icon: <AntDesignOutlined />,
            label: <Link to={"setting/jobs"}>Setting Jobs</Link>,
          },
          {
            key: "cv",
            icon: <TeamOutlined />,
            label: <Link to={"setting/cv"}>Setting CV</Link>,
          },
        ],
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          Modal.confirm({
            title: "Do you want to log out",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: () => handleDelete(),
          });
        },
      },
    ];
  } else if (token === "user") {
    items = [
      {
        key: "home",
        icon: <HomeOutlined />,
        label: <Link to={"/"}>Trang chủ</Link>,
      },
      {
        key: "company",
        icon: <BankOutlined />,
        label: "Danh sách công ty",
        children: company.map((value) => ({
          key: Math.random() * 100,
          label: <Link to={`company/${value.id}`}>{value.companyName}</Link>,
        })),
      },
      {
        key: "city",
        label: "Tìm việc theo thành phố",
        children: cityName.map((value, index) => ({
          key: index,
          label: <Link to={`search/${value.value}/all`}>{value.value}</Link>,
        })),
      },
      {
        key: "settings",
        icon: <SettingFilled />,
        label: <Link to={"setting/info"}>Setting Account</Link>,
      },
      {
        key: "viewCv",
        icon: <EyeFilled />,
        label: <Link to={"setting/viewcv"}>Xem CV đã nộp</Link>,
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          Modal.confirm({
            title: "Do you want to log out",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: () => handleDelete(),
          });
        },
      },
    ];
  } else if (token === "admin") {
    items = [
      {
        key: "/",
        icon: <RiDashboard2Fill />,
        label: <Link to={"/dashboardA"}>Dashboard</Link>,
      },
      {
        key: "settingsApplicant",
        icon: <ImUser />,
        label: <Link to={"/manageUser"}> Quản lý người ứng tuyển </Link>,
      },
      {
        key: "settingCompany",
        icon: <RiBuilding4Fill />,
        label: <Link to={"/manageCompany"}>Quản lý công ty</Link>,
      },
    ];
  } else {
    items = [
      {
        key: "home",
        icon: <IoHomeOutline />,
        label: <Link to={"/"}>Home</Link>,
      },
      {
        key: "company",
        icon: <BankOutlined />,
        label: "Danh sách công ty",
        children: company.map((value) => ({
          key: Math.random() * 100,
          label: <Link to={`company/${value.id}`}>{value.companyName}</Link>,
        })),
      },
      {
        key: "city",
        label: "Tìm việc theo thành phố",
        children: cityName.map((value, index) => ({
          key: index,
          label: <Link to={`search/${value.value}/all`}>{value.value}</Link>,
        })),
      },
      {
        key: "login",
        label: <Tooltip title="Dành cho nhà tuyển dụng">Đăng nhập</Tooltip>,
        icon: <LoginOutlined />,
        onClick: () => {
          Modal.confirm({
            title: "Chọn loại đăng nhập ?",
            okText: "Ứng viên",
            cancelText: "Nhà tuyển dụng ",
            closable: true,
            cancelButtonProps: { danger: true },
            onCancel: () => {
              navigate("/logincompany");
            },
            onOk: () => {
              navigate("/loginuser");
            },
          });
        },
      },
    ];
  }

  return (
    <>
      <Menu items={items} mode="inline" />
    </>
  );
}

export default MenuSider;
