import React from "react";
import RouterView from "@/router/index";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
import logo from '@/assets/images/logo.png';

export default function Main(props: any) {
  return (
    <div className={style.main}>
      <header className={style.header}>
          <img className={style.logo} src={logo} alt="logo" />
          <div className={style.options}>
            <Link to={"/login"}>登录</Link>
          </div>
      </header>
      <main className={style.container}>
          <RouterView routes={props.routes} />
      </main>
    </div>
  );
}
