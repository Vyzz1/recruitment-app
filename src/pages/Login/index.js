import { notification } from "antd";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Get } from "../../utils/requestFirebase";
import { setCookie } from "../../SetCookie";
import { useNavigate } from "react-router-dom";
import image from "./image.jpg";
import { Typewriter } from "react-simple-typewriter";
function Login() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Get("company");
      if (response) {
        setData(response);
      }
    };
    fetchUsers();
  }, []);
  const Context = React.createContext({
    name: "Default",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (str) => {
    api[str.icon]({
      message: str.message,
      description: str.description,
      placement: "topRight",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    const user = data.filter(
      (user) => user.email === email && user.password === password
    );
    let currentUser = user[user.length - 1];
    if (user.length > 0) {
      let info = {
        email: email,
        id: currentUser.id,
      };
      setCookie("token", currentUser.token, 1000, 1);

      setCookie("info", JSON.stringify(info), 1000, 1);
      setCookie("role", currentUser.role, 1000, 1);

      let str = {
        message: "Đăng nhập thành công",
        description: "Chúc mừng bạn đã đăng nhập thành công",
        icon: "success",
      };
      openNotification(str);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      let str = {
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu sai",
        icon: "error",
      };
      openNotification(str);
    }
  };
  const contextValue = {
    name: "Default",
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <form onSubmit={handleSubmit}>
          <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div class="flex flex-col justify-center p-8 md:p-14">
                <h1 className="text-5xl font-semibold">
                  <Typewriter cursor words={["Đăng nhập", "Chào mừng "]} />
                </h1>
                <span class="font-light text-gray-400 mb-8">
                  Chào mừng nhà tuyển dụng
                </span>
                <div class="py-4">
                  <span class="mb-2 text-md">Email</span>
                  <input
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    name="email"
                    id="email"
                  />
                </div>
                <div class="py-4">
                  <span class="mb-2 text-md">Password</span>
                  <input
                    type="password"
                    name="password"
                    id="pass"
                    class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
                <div class="flex justify-between w-full py-4">
                  <div class="mr-24">
                    <input type="checkbox" name="ch" id="ch" class="mr-2" />
                    <span class="text-md cursor-pointer">
                      Remember for 30 days
                    </span>
                  </div>
                  <span class="font-bold text-md cursor-pointer">
                    Quên mật khẩu
                  </span>
                </div>
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
                  Sign in
                </button>
              </div>
              <div class="relative">
                <img
                  src={image}
                  alt="img"
                  class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                />
                <div class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                  <span class="text-black text-xl">
                    We've been uesing Untitle to kick"
                    <br />
                    start every new project and can't <br />
                    imagine working without it."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Context.Provider>
    </>
  );
}
export default Login;
