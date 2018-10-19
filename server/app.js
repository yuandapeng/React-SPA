var http = require('http');
var express = require('express');
var app = express();
var path =require("path");
require('console-stamp')(console, "HH:MM:ss.l");
if(process.env.NODE_ENV==="development"){
    require("./webpack-hot-replace")(app)
}else{

    app.use(express.static(path.join(process.cwd(),"public")));


    app.get("/getWeather",(req,response)=>{
        console.log("进来了")
        http.get('http://www.weather.com.cn/data/sk/101190408.html',function(req,res){
            var html='';
            req.on('data',function(data){
                html+=data;
            });
            req.on('end',function(){
                console.info(html);
                response.send(html)

            });
        });
    });
}




//启动服务
if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000);
}






