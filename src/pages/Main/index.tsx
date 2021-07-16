import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterView from "@/router/index";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
import logo from "@/assets/images/logo.png";
import request from "@/request";
import { loginSuccess } from "@/store/actions/login";

export default function Main(props: any) {
  const { isLogin, user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        const res = await request({
          url: "/api/admin/token",
          method: "POST",
        });
        dispatch(loginSuccess(res));
      }
    })();
  }, []);
  return (
    <div className={style.main}>
      <header className={style.header}>
        <img className={style.logo} src={logo} alt="logo" />
        <div className={style.options}>
          {isLogin ? (
            <Link to={"/dashboard"}>{user.username}</Link>
          ) : (
            <Link to={"/login"}>登录</Link>
          )}
        </div>
      </header>
      <main className={style.container}>
        <RouterView routes={props.routes} />
      </main>
    </div>
  );
}
