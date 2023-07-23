"use client";

import { authApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ILoginFormValue {
  username: { value: string };
  password: { value: string };
}

export default function Auth() {
  const router = useRouter();

  const [loginErrMessage, setLoginErrMessage] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoginErrMessage("");

    const username = (event.target as typeof event.target & ILoginFormValue).username.value;
    const password = (event.target as typeof event.target & ILoginFormValue).password.value;

    if (!username) {
      setLoginErrMessage("Vui lòng nhập username");
      return;
    }

    if (!password) {
      setLoginErrMessage("Vui lòng nhập password");
      return;
    }

    authApi
      .login({ username, password })
      .then((resp) => {
        if (resp.status === 200) {
          router.push("/");
        } else {
          throw new Error(resp.data?.message || "Đăng nhập thất bại");
        }
        })
      .catch((err) => {
        setLoginErrMessage(err.message);
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#0c0116]">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="form-inner">
          <h2>LOGIN</h2>
          <div className="content">
            <input className="input" type="text" placeholder="Username" name="username" />
            <input className="input" type="password" placeholder="Password" name="password" />
            <div className="text-red-500 py-2 h-5">{loginErrMessage}</div>
            <button type="submit" className="btn">
              LOGIN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
