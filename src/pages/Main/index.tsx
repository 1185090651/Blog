import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterView from "@/router/index";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
import logo from "@/assets/images/logo.png";
import request from "@/request";
import { loginSuccess, loginPending, loginError } from "@/store/actions/login";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "./components/Header";

export default function Main(props: any) {
  const { isLogin, user, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        dispatch(loginPending());
        const res = await request({
          url: "/api/admin/token",
          method: "POST",
        }).catch((err) => {
          dispatch(loginError(err));
        });
        if(res) {
          dispatch(loginSuccess(res));
        }
      }
    })();
  }, []);
  return (
    <div className={style.main}>
      <Header>
        <img className={style.logo} src={logo} alt="logo" />
        <div className={style.options}>
          {loading ? (
            <LoadingOutlined style={{ fontSize: 20 }} />
          ) : isLogin ? (
            <Link to={"/dashboard"}>{user?.username}</Link>
          ) : (
            <Link to={"/login"}>登录</Link>
          )}
        </div>
      </Header>
      <div className={style.placeholder} />
      <main className={style.container}>
        <Suspense fallback={<div></div>}>
          <RouterView routes={props.routes} />
        </Suspense>
      </main>
    </div>
  );
}
