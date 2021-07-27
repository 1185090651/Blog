import React from 'react';
import { Form, Input, Button } from 'antd';
import style from './index.module.scss';
import { IState } from '@/store/reducers';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, LoginParams } from '@/store/actions/login';


export default function Login () {
    const dispatch = useDispatch();
    const loading = useSelector((state: IState) => state.user.loading);
    const onFinish = async (data: LoginParams) => {
        dispatch(login(data));
    };
    return (
        <div className={style.login}>
            <div className={style['login-title']}>Log in to Blog</div>
            <Form
                className={style.form}
                name="login"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size="large" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size="large" prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className={style['form-btn']}
                        loading={loading}
                    >
            登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
