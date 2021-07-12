import React from "react";
import { Form, Input, Button } from "antd";
import style from "./index.module.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginPending, loginSuccess, loginError } from "@/store/actions/login";
import request from "@/request";

interface LoginParams {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const onFinish = async (data: LoginParams) => {
    dispatch(loginPending());
    const res = await request({
      url: "/api/login",
      method: "POST",
      data,
    }).catch((error) => {
      dispatch(loginError(error));
    });
    if (res) {
      dispatch(loginSuccess(res));
    }
    console.log("Success:", data);
  };

  const onFinishFailed = (error: any) => {
    dispatch(loginError(error));
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
            loading={false}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
