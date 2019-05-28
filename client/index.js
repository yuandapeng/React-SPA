import {createBrowserHistory as createHistory} from "history"
import dva from 'dva';
import RouterConfig from "./router" 
// 1. Initialize
const app = dva({
    history:createHistory()
});
// 2. Model
app.model(require('./models/global').default);
// 4. Router
app.router(RouterConfig);
// 5. Start
app.start('#root');

//HotModuleReplacementPlugin 开启暴露 module.hot
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept();
}
