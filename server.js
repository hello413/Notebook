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
            console.log(params)
            db.query(`select username from User where username='${username}'`, function(err, data) {
                if (data !== undefined) {
                    res.end("此用户名已存在")
                } else {
                    db.query(`insert into User(username,password,email) values('${username}','${password}','${email}')`, function(err, data) {
                        if (err) {
                            res.end("数据库出错")
                        } else {
                            res.end("注册成功")
                        }
                    })
                }
            })
        })
    }
    //登录
    if (pathname == '/login') {
        var postData = "";
        req.on("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postData);
            var username = params.username
            var password = params.password
            db.query(`select 学号,密码 from student where 学号='${username}'and 密码='${password}'`, function(err, data) {
                //查询数据库
                if (err) {
                    res.write("数据库出错了")
                    res.end();
                } else if (data.length == 0) { //没有数据
                    res.write("");
                    res.end();
                } else if (data.length != 0) {
                    db.query(`select 姓名 from student where 学号='${username}'`, function(err, data) {
                        var s = JSON.stringify(data)
                        name1 = s.substring(s.indexOf(":") + 2, s.lastIndexOf("}") - 1)
                        res.end(s);
                        db.query(`update user set username='${name1}',sno='${username}'`, function(err, data) {})
                    })
                }
            })
        })
    }
}).listen(8084)