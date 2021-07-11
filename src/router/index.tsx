import React from "react";
// 路由内置组件
import { Route, Switch, Redirect } from "react-router-dom";
// 渲染路由
const RouterView = (props:any) => {
  // 取出重定向的路由
  let redirects = props.routes.filter((item:any) => {
    return item.redirect;
  });
  // 取出非重定向路由
  let routes = props.routes.filter((item:any) => item.component);
  return (
      <Switch>
        {routes.map((item:any, index:any) => {
          // 遍历路由配置表  数组
          return (
            <Route
              key={index}
              path={item.path}
              render={props => {
                if (item.children.length) {
                  return <item.component {...props} routes={item.children} />;
                } else {
                  return <item.component {...props} />;
                }
              }}
            ></Route>
          );
        })}
        {redirects.map((item:any, index:any) => {
          return <Redirect key={index} to={item.redirect}></Redirect>;
        })}
      </Switch>
  );
};
export default RouterView;
