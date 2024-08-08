"use client";

import { authApi } from "@/api/auth";
import { Button } from "@/components/common/Button";
import { LoginPageStyled } from "@/components/LoginPage/styled";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LoginPageProps {}

interface ILoginFormValue {
  username: { value: string };
  password: { value: string };
}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();

  const [loginErrMessage, setLoginErrMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

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

    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoginPageStyled className="flex h-screen w-screen items-center justify-center bg-[#22073b]">
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
            <div className="h-5 py-2 text-red-500">{loginErrMessage}</div>
            <Button type="submit" className="mt-5 w-full" loading={loading}>
              LOGIN
            </Button>
          </div>
        </div>
      </form>
    </LoginPageStyled>
  );
};
