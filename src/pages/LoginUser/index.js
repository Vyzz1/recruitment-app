import { notification } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { Get } from "../../utils/requestFirebase";
import { setCookie } from "../../SetCookie";
import { Typewriter } from "react-simple-typewriter";
const LoginUser = () => {
  const contextValue = {
    name: "Default",
  };
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Get("applicant");
      if (response) {
        setData(response);
      }
    };
    fetchUsers();
  }, []);

  const onFinish = (e) => {
    e.preventDefault();

    let email = e.target[0].value;
    let password = e.target[1].value;

    const user = data.filter(
      (user) => user.email === email && user.password === password
    );
    let currentUser = user[user.length - 1];

    // Destructuring currentUser to exclude the password and get the rest of the properties

    if (user.length > 0) {
      let { password: excludedPassword, ...infoWithoutPassword } = currentUser;
      let info = { ...infoWithoutPassword };
      setCookie("token", currentUser.token, 1000, 1);
      setCookie("role", currentUser.role, 1000, 1);
      setCookie("curr_user", JSON.stringify(info), 1000, 1);
      let str = {
        message: "Đăng nhập thành công",
        description: "Chúc mừng bạn đã đăng nhập thành công",
        icon: "success",
      };
      openNotification(str);
      setTimeout(() => {
        navigate("/");
      }, 1400);
    } else {
      let str = {
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu sai",
        icon: "error",
      };
      openNotification(str);
    }
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Content>
          <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
              <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
                <h1 className="text-5xl font-semibold">
                  <Typewriter
                    cursor
                    words={["Đăng nhập", "Chào mừng trở lại!"]}
                  />
                </h1>
                <p className="font-medium text-lg text-gray-500 mt-4">
                  Hệ thống web tìm kiếm việc làm
                </p>
                <form onSubmit={onFinish}>
                  <div className="mt-8">
                    <div className="flex flex-col">
                      <label className="text-lg font-medium">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="text-lg font-medium">Password</label>
                      <input
                        className="w-full border-2  border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter your password"
                        name="password"
                        required
                        type={"password"}
                      />
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <div>
                        <input type="checkbox" id="remember" />
                        <label
                          className="ml-2 font-medium text-base"
                          for="remember"
                        >
                          Remember for 30 days
                        </label>
                      </div>
                      <button
                        type="button"
                        className="font-medium text-base text-violet-500"
                      >
                        Quên mật khẩu
                      </button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                      <button
                        type="submit"
                        className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="mt-8 flex justify-center items-center">
                      <p className="font-medium text-base">
                        Chưa có tài khoản ?
                      </p>
                      <button
                        onClick={() => navigate("/registeruser")}
                        className="ml-2 font-medium text-base text-violet-500"
                      >
                        Đăng ký ngay
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
              <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
          </div>
        </Content>
      </Context.Provider>
    </>
  );
};

export default LoginUser;
