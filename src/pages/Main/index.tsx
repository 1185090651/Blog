import React from "react";
import { useSelector } from 'react-redux';
import RouterView from "@/router/index";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
import logo from '@/assets/images/logo.png';
import { IState } from "@/store/reducers";

export default function Main(props: any){
  const {isLogin, user} = useSelector<IState, any>(state => state.user)
  return (
    <div className={style.main}>
      <header className={style.header}>
          <img className={style.logo} src={logo} alt="logo" />
          <div className={style.options}>
            {
              isLogin ? user.username : <Link to={"/login"}>登录</Link>
            }
          </div>
      </header>
      <main className={style.container}>
          <RouterView routes={props.routes} />
      </main>
    </div>
  );
}
