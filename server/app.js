var http = require('http');
var express = require('express');
var app = express();
var path =require("path");
require('console-stamp')(console, "HH:MM:ss.l");
if(process.env.NODE_ENV==="development"){
    require("./webpack-hot-replace")(app)
}else{
    app.use(express.static(path.join(process.cwd(),"public")));
    app.get("/", (req,res)=> {
        res.sendFile("index.html");
    });
}
//启动服务
if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000);
}






