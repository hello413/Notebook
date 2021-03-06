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
                    res.write("数据库出错了")
                    res.end();
                } else if (data.length == 0) { //没有数据
                    res.write("");
                    res.end();
                } else if (data.length != 0) {
                    var s = JSON.stringify(data)
                    res.end(s);
                    db.query(`update session set Email='${email}' where id = 1`, function(err, data) {})
                }
            })
        })
    }
    //名字展示
    if (pathname == '/name') {
        db.query(`select Email from session where id = 1`, function(err, data) {
            var s1 = eval(JSON.stringify(data))[0].Email
            db.query(`SELECT username from user where email='${s1}'`, function(err, data) {
                var s = eval(JSON.stringify(data))[0].username
                if (err) {
                    res.write("数据库错误");
                    res.end();
                } else {
                    res.end(s)
                }
            })
        })
    }
    //信息展示
    if (pathname == '/message') {
        db.query(`select Email from session where id = 1`, function(err, data) {
            var s1 = eval(JSON.stringify(data))[0].Email
            db.query(`SELECT count(*) as count0,sum(note.like_num) as sum0 ,sum(note.read_num) as sum1 from test.user,test.note where user.email='${s1}' and user.u_id=note.user_id`, function(err, data) {
                var s = JSON.stringify(data)
                if (err) {
                    res.write("数据库错误");
                    res.end();
                } else {
                    res.end(s)
                }
            })
        })
    }
    //主页获取所有文章
    if (pathname == '/main') {
        var postData = "";
        req.on("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postData);
            var first = (parseInt(params.first) - 1) * 4
            db.query(`update session set paking='${parseInt(params.first)}' where id = 1`, function(err, data) {})
            db.query(`select Email from session where id = 1`, function(err, data) {
                var s1 = eval(JSON.stringify(data))[0].Email
                db.query(`select u_id from user where email = '${s1}'`, function(err, data) {
                    var s2 = eval(JSON.stringify(data))[0].u_id
                    db.query(`select notename,notecontent,tag,read_num from note where user_id = '${s2}' limit ${first},4`, function(err, data) {
                        var s = JSON.stringify(data)
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
    //改session
    if (pathname == '/noteid') {
        var postData = "";
        req.on("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postData);
            var noteid = parseInt(params.noteid)
            db.query(`select paking from session where id = 1`, function(err, data) {
                var s1 = (parseInt(eval(JSON.stringify(data))[0].paking) - 1) * 4
                db.query(`update session set note_id='${noteid+s1}' where id = 1`, function(err, data) {})
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
            db.query(`select Email from session where id = 1`, function(err, data) {
                var s1 = eval(JSON.stringify(data))[0].Email
                db.query(`select u_id from user where email='${s1}'`, function(err, data) {
                    var s2 = eval(JSON.stringify(data))[0].u_id
                    db.query(`select notename from note where user_id='${s2}' and notename = '${notename}'`, function(err, data) {
                        if (err) {
                            res.write("数据库错误");
                            res.end();
                        } else if (data.length != 0) {
                            res.write("已经有这个文章题目了")
                            res.end()
                        } else {
                            db.query(`insert into note(notename,notecontent,tag,user_id) values ('${notename}','${notecontent}','${tag}',${s2})`, function(err, data) {
                                var s = JSON.stringify(data)
                                if (err) {
                                    res.write("数据库错误");
                                    res.end();
                                } else {
                                    res.write("添加成功")
                                    res.end()
                                }
                            })
                        }
                    })
                })
            })
        })
    }
    //读文章
    if (pathname == '/read') {
        db.query(`select note_id from session where id = 1`, function(err, data) {
            var s1 = eval(JSON.stringify(data))[0].note_id
            db.query(`SELECT notename,notecontent,tag from note where n_id=${s1}`, function(err, data) {
                var s = JSON.stringify(data)
                if (err) {
                    res.write("数据库错误");
                    res.end();
                } else {
                    res.end(s)
                }
            })
        })
    }
    //删文章
    if (pathname == '/delete') {
        db.query(`select note_id from session where id = 1`, function(err, data) {
            var s1 = eval(JSON.stringify(data))[0].note_id
            db.query(`DELETE FROM note WHERE (n_id = '${s1}');`, function(err, data) {
                if (err) {
                    res.write("数据库错误");
                    res.end();
                } else {
                    res.write("删除成功")
                    res.end()
                    db.query(`ALTER TABLE test.note DROP n_id;`, function(err, data) {})
                    db.query(`ALTER TABLE test.note ADD n_id MEDIUMINT( 8 ) NOT NULL FIRST;`, function(err, data) {})
                    db.query(`ALTER TABLE test.note MODIFY COLUMN n_id MEDIUMINT( 8 ) NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY(n_id);`, function(err, data) {})
                }
            })
        })
    }
    //改文章
    if (pathname == '/update') {
        var postdata = "";
        req.on("data", function(postDataChunk) {
            postdata += postDataChunk;
        });
        req.on("end", function() {
            var params = querystring.parse(postdata);
            var notename = params.notename
            var notecontent = params.notecontent
            var tag = params.tag
            db.query(`select note_id from session where id = 1`, function(err, data) {
                var s1 = eval(JSON.stringify(data))[0].note_id
                db.query(`UPDATE note SET notename='${notename}',notecontent='${notecontent}',tag='${tag}' WHERE (n_id = '${s1}');`, function(err, data) {
                    if (err) {
                        res.write("数据库错误");
                        res.end();
                    } else {
                        res.write("修改成功")
                        res.end()
                    }
                })
            })
        })
    }
}).listen(8084)