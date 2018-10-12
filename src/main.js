import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import App from "./pages/home/home";
import Dashboard from "./pages/dashboard";
import { LocaleProvider } from 'antd';
import { Switch, Route,BrowserRouter } from 'react-router-dom';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(<Provider store={store} children={
    <LocaleProvider locale={zhCN}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </Switch>
        </BrowserRouter>
</LocaleProvider>}/>, document.getElementById('root'));
