import { Outlet, useNavigate } from "react-router-dom";
import { GetCookie } from "../../GetCookie";
import Swal from "sweetalert2";

function PrivateRoutes() {
  const navigate = useNavigate();
  const token = GetCookie("token");
  const role = GetCookie("role");
  let valid = true;
  if (token === "undefined" || role === "undefined" || !token || !role) {
    valid = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/"), 2300);
  }

  return <>{valid && role === "com" && <Outlet />}</>;
}

export default PrivateRoutes;
