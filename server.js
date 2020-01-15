const http = require('http')
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
console

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
                if (data.length > 0) {
                    res.end("此用户名已存在")
                } else {
                    db.query(`select email from User where email='${email}'`, function(err, data) {
                        if (data.length > 0) {
                            res.end("此邮箱已占用")
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
            var email = params.email
            var password = params.password
            db.query(`select email,password from user where email='${email}'and password='${password}'`, function(err, data) {
                //查询数据库
                if (err) {
                    console.log("error")
                    res.write("数据库出错了")
                    res.end();
                } else if (data.length == 0) { //没有数据
                    console.log("no have")
                    res.write("");
                    res.end();
                } else if (data.length != 0) {
                    var s = JSON.stringify(data)
                    console.log(s)
                    res.end(s);
                    db.query(`update session set Email='${email}' where id = 1`, function(err, data) {})
                }
            })
        })
    }
    //名字信息展示
    if (pathname == '/name') {
        db.query(`select Email from session where id = 1`, function(err, data) {
            var s1 = eval(JSON.stringify(data)).Email
            db.query(`SELECT user.username,count(*) as count0,sum(note.like_num) as sum0 ,sum(note.read_num) as sum1 from test.user,test.note where user.email='${s1}' and user.u_id=note.user_id`, function(err, data) {
                var s = JSON.stringify(data)
                console.log(s)
                if (err) {
                    res.write("数据库错误");
                    res.end();
                } else {
                    res.end(s)
                }
            })
        })
    }
    //主页
    if (pathname == '/main') {
        var postData = "";
        req.on("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postData);
            var search = params.search
            db.query(`select node.tag,node.notename,node.notecontent from note,user where notename='${search}'and note.user_id=user.u_id and user.email = '${Email}'`, function(err, data) {
                //查询数据库
                if (err) {
                    res.write("数据库出错了")
                    res.end();
                } else if (data.length == 0) { //没有数据
                    console.log("no have")
                    res.write("");
                    res.end();
                } else if (data.length != 0) {
                    var s = JSON.stringify(data)
                    console.log(s)
                    res.end(s);
                }
            })
        })
    }
    //写文章
    if (pathname == '/write') {
        var postdata = "";
        req.on("data", function(postDataChunk) {
            postdata += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postdata);
            var notename = params.notename
            var notecontent = params.notecontent
            var tag = params.tag
            console.log(params)
            db.query(`select Email from session where id = 1`, function(err, data) {
                var s1 = eval(JSON.stringify(data))[0].Email
                db.query(`select u_id from user where email='${s1}'`, function(err, data) {
                    var s2 = eval(JSON.stringify(data))[0].u_id
                    db.query(`insert into note(notename,notecontent,tag,user_id) values ('${notename}','${notecontent}','${tag}',${s2})`, function(err, data) {
                        var s = JSON.stringify(data)
                        console.log(s)
                        if (err) {
                            res.write("数据库错误");
                            res.end();
                        } else {
                            res.end(s)
                        }
                    })
                })
            })
        })
    }
}).listen(8084)