
module.exports=(app)=>{
    var opn=require("opn");
    var uri = "http://"+ require("ip").address()+":"+(process.env.PORT||3000);
    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');

    var webpackConfig = require('../webpack.dev.config');
    var compiler = webpack(webpackConfig);

    var  devMiddleware = require("webpack-dev-middleware")(compiler, {
        logLevel: 'warn', publicPath: webpackConfig.output.publicPath
    });
    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(devMiddleware);
    //webpack中间件编译成功后打开浏览器
    devMiddleware.waitUntilValid(() => {
        console.log('> Listening at ' + uri + '\n')
        opn(uri);
    })
    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler));
}

