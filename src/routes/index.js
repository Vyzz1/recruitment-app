import LayoutDefault from "../layouts/LayoutDefault";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Searching from "../pages/Searching";
import DetailCompany from "../pages/DetailCompany";
import DetailJobs from "../pages/DetailJobs";
import SettingCompany from "../pages/SettingCompany";
import SettingJobs from "../pages/SettingJobs";
import DetailJobsAdmin from "../pages/DetailJobsAdmin";
import ManageCv from "../pages/ManageCV";
import DetailCv from "../pages/DetailCv";
import Register from "../pages/Register";
import CvByJob from "../pages/CvByJob";
import { RegisterUser } from "../pages/RegisterUser";
import LoginUser from "../pages/LoginUser";
import UserInformation from "../pages/UserInformation";
import PrivateUser from "../components/PrivateUser";
import { ViewCV } from "../pages/ViewCV";
import LoginAdmin from "../pages/LoginAdmin";
import DashboardAdmin from "../pages/DashboardAdmin";
import ManageUser from "../pages/ManageUser";
import ManageCompany from "../pages/MangeCompany";
import PrivateAdmin from "../components/PrivateAdmin";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/search/:city/:text",
        element: <Searching />,
      },
      {
        path: "/company/:idCompany",
        element: <DetailCompany />,
      },
      {
        path: "/jobs/:id",
        element: <DetailJobs />,
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },

          {
            path: "setting/company",
            element: <SettingCompany />,
          },
          {
            path: "setting/jobs",
            element: <SettingJobs />,
          },
          {
            path: "admin/jobs/:id",
            element: <DetailJobsAdmin />,
          },
          {
            path: "setting/cv",
            element: <ManageCv />,
          },
          {
            path: "admin/cv/:id",
            element: <DetailCv />,
          },
          {
            path: "admin/job/:id/cv",
            element: <CvByJob />,
          },
        ],
      },
      {
        element: <PrivateUser />,
        children: [
          {
            path: "/setting/info",
            element: <UserInformation />,
          },
          {
            path: "/setting/viewcv",
            element: <ViewCV />,
          },
        ],
      },
      {
        element: <PrivateAdmin />,
        children: [
          {
            path: "/dashboardA",
            element: <DashboardAdmin />,
          },
          {
            path: "/manageUser",
            element: <ManageUser />,
          },
          {
            path: "/manageCompany",
            element: <ManageCompany />,
          },
        ],
      },
    ],
  },
  {
    path: "registercompany",
    element: <Register />,
  },
  {
    path: "logincompany",
    element: <Login />,
  },
  {
    path: "loginuser",
    element: <LoginUser />,
  },
  {
    path: "registeruser",
    element: <RegisterUser />,
  },
  {
    path: "/admin",
    element: <LoginAdmin />,
  },
];
