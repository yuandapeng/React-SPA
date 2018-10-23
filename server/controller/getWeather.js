const http = require("http");
const  getWeather =(req,response)=>{
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
}


module.exports = {
    'GET /getWeather': getWeather,
}
