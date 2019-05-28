import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch,Redirect } from 'dva/router';
import Loadable from 'react-loadable';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import moment from "moment";
moment.locale("zh-cn");
import { LocaleProvider } from "antd";
import loading from "@components/loading";
const App = Loadable({
    loader: () => import("@pages/home/home"),
    loading
});
const dashboard = Loadable({
    loader: () => import("@pages/dashboard"),
    loading
});
const NotFoundPage = Loadable({
    loader: () => import("@pages/404"),
    loading
});
 
function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zhCN}>
        <Router history={history}>
            <Switch>
                    <Route exact path='/' component={App}/>
                    <Route exact path='/dashboard' component={dashboard}/>
                    <Route path='/404' component={NotFoundPage} />
                    <Redirect from='*' to='/404' />
            </Switch>
        </Router>
    </LocaleProvider>
  );
}
 
export default RouterConfig;