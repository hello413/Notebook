const http = require('http')
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

//连接数据库服务器
var db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test' //连接池
});

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url).query; //解析用户请求路径
    //注册
    if (pathname == '/sign') {
        var postdata = "";
        req.on("data", function(postDataChunk) {
            postdata += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postdata);
            var username = params.username
            var email = params.email
            var password = params.password
            console.log(params + " " + username + " " + email + " " + password)
                // db.query(`select username from User where username='${username}'`, function(err, data) {
                //     if (data == undefined) {
                //         res.end("此用户名已存在")
                //     }
                // })
                // db.query(`insert into User(username,password,email) values('${username}','${password}','${email}')`, function(err, data) {
                //     if (err) {
                //         res.end("数据库出错")
                //     } else {
                //         res.end("注册成功")
                //     }
                // })
        })
    }

}).listen(8080)