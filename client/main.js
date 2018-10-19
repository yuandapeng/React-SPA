import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { LocaleProvider } from "antd";
import { Switch, Route, BrowserRouter ,Redirect ,HashRouter } from "react-router-dom";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {createStore, combineReducers} from "redux";
import global from "./model/global";
import loading from "./pages/components/loading";
// 引入中间件
const store = createStore(combineReducers({global}),{})
moment.locale("zh-cn");
import Loadable from 'react-loadable';
const App = Loadable({
    loader: () => import("./pages/home/home"),
    loading
});
const dashboard = Loadable({
    loader: () => import("./pages/dashboard"),
    loading
});
const NotFoundPage = Loadable({
    loader: () => import("./pages/404"),
    loading
});


ReactDOM.render(<Provider store={store} children={
    <LocaleProvider locale={zhCN}>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/dashboard' component={dashboard}/>
                <Route path='/404' component={NotFoundPage} />
                <Redirect from='*' to='/404' />
            </Switch>
        </HashRouter>
    </LocaleProvider>}/>, document.getElementById("root"));
//HotModuleReplacementPlugin 开启暴露 module.hot
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept();
}
