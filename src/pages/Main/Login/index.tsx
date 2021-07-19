import React from "react";
import { Form, Input, Button, message } from "antd";
import style from "./index.module.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loginPending, loginSuccess, loginError } from "@/store/actions/login";
import request from "@/request";

interface LoginParams {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: any) => state.user.loading);
  const onFinish = async (data: LoginParams) => {
    dispatch(loginPending());
    const res = await request({
      url: "/api/user/login",
      method: "POST",
      data,
    }).catch((error) => {
      dispatch(loginError(error));
      message.error(error);
    });
    if (res) {
      localStorage.token = res.token;
      dispatch(loginSuccess(res));
      message.success("登录成功!");
      history.push('/dashboard')
    }
  };
  const onFinishFailed = (error: any) => {
    dispatch(loginError(error));
    message.error(error);
  };
  return (
    <div className={style.login}>
      <div className={style["login-title"]}>Log in to Blog</div>
      <Form
        className={style.form}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={style["form-btn"]}
            loading={loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
