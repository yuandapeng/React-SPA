const http = require("http");
const  getWeather =(req,response)=>{
    http.get('http://www.weather.com.cn/data/sk/101190408.html',function(req,res){
        var html='';
        req.on('data',function(data){
            html+=data;
        });
        req.on('end',function(){
            try {
                let result = {
                    code:0,
                    result:JSON.parse(html)
                };
                response.status(200);
                response.json(result);    
            } catch (error) {
                let result = {
                    code:1,
                    result:{}
                };
                response.status(500);
                response.json(result);
            }
           
        });
    });
}


module.exports = {
    'GET /getWeather': getWeather,
}
