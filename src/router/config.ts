// 路由配置表
// 一级路由
import Main from '../pages/Main';
import Login from '../pages/Main/Login/index';
const routes = [
    {
        path:'/',
        component: Main,
        children: [
            {
                path:'/login',
                component: Login,
                children:[]
            }
        ]
    }
]
export default routes;