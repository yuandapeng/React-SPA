var http = require('http');
var express = require('express');
require('console-stamp')(console, "HH:MM:ss.l");
var app = express();

if(process.env.NODE_ENV==="development"){
    require("./webpack-hot-replace")(app)
}

//启动服务
if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000);
}
