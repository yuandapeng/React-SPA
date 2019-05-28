var http = require('http');
var express = require('express');
var app = express();
var path =require("path");
var chokidar = require('chokidar');
require('console-stamp')(console, "HH:MM:ss.l");
 
if(process.env.NODE_ENV==="development"){
    require("./webpack-hot-replace")(app);
    if(process.env.WATCH){
        chokidar.watch('webpack.dev.config.js').on('change', function(){
            console.warn('webpack.dev.config.js > change.....');
            process.exit(1);
            console.info('exit process');
            process.exec("tnpm run start:node:dev");
        });
    }
}else{
    app.use(express.static(path.join(process.cwd(),"public")));
}


require("./controllerMiddle")(app);

//启动服务
if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000);
}


   
   










