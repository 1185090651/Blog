import { lazy } from 'react';
// 路由配置表
// 一级路由
import Main from '../pages/Main';
const Login = lazy(() => import('../pages/Main/Login/index'));
const Dashboard = lazy(() => import('../pages/Main/Dashboard'));
const routes = [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/login',
                component: Login
            },
            {
                path: '/dashboard',
                component: Dashboard
            }
        ]
    }
];
export default routes;