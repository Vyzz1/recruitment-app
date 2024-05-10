import React from "react";
import { GetCookie } from "../../GetCookie";
import Swal from "sweetalert2";
import { Outlet, useNavigate } from "react-router-dom";
const PrivateUser = () => {
  const token = GetCookie("token");
  const role = GetCookie("role");
  const nag = useNavigate();
  // const [valid, setValid] = useState(true);
  let valid = true;
  if (token === "undefined" || role === "undefined" || !token || !role) {
    valid = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => {
      nag("/loginuser");
    }, 2300);
  }

  return <> {valid && <Outlet />} </>;
};

export default PrivateUser;
