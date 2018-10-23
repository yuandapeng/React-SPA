const blog = require("../model/blogModel");

/**
 * 插入
 */
function insert(req, res) {
    new blog({
        "username": "Tracy McGrady",
        "userpwd": "abcd",
        "userage": 36,
        "logindate": new Date(),
    }).save(function(error,doc){
        if(error){
            console.log("error :" + error);
        }else{
            res.json({
                result:doc
            });
        }
    });
}


/**
 * 查询
 */
function get(req, res) {
    //skip 跳过的条数 limit 限制返回的条数 sort排序 1升序 -1 降序 执行的时候会先排序再skip，再limit
    blog.find({username:'Tracy McGrady'},null,{limit:3,sort:{logindate:-1}},(err, result) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json({
                result: result
            })
        }
    });
}

/**
 * 删除
 */
function deleteBlog(req, res) {

    blog.remove({username:'Tracy McGrady'},function(err,docs){
        //result: { ok: 1, n: 3 }
        res.json({
            result:docs
        })
    });
}

/**
 * 更新
 * @param req
 * @param response
 */
function update(req, response){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'bbb'};

    blog.update(wherestr, updatestr, function(err, res){
        if (err) {
            return;
        }
        else {
            response.json({result: res});
        }
    })
}




module.exports = {
    "POST /insert": insert,
    "GET /getBlob": get,
    "POST /deleteBlog" :deleteBlog,
    "POST /update" :update
};






