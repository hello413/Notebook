const http = require('http')
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const express = require('express');
var app = express();

//连接数据库服务器
var db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', user: 'root', password: '459659281', database: 'notes_user' //连接池
});

http.createServer(function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  var pathname = url.parse(req.url).pathname;
  var query = url.parse(req.url).query;//解析用户请求路径
   console.log(pathname)

  if(pathname=='/reg'){
    var postdata="";
    req.on("data", function (postDataChunk) {   
      postdata += postDataChunk;
    });
    req.on("end",function(){
      var params = querystring.parse(postdata);//GET & POST  ////解释表单数据部分
      var username = params.username
      var password = params.password
      var sex=params.sex
      var age=params.age
      var profile=params.Personal_profile
      db.query(`select username from student where username='${username}'`,function(err,data){
        console.log(data)
        if(data==undefined){
          res.end("此用户名已存在")
        }
    })
    db.query(`insert into user_information(username,password,sex,age,profile) values('${username}','${password}','${sex}','${age}','${profile}')`,function(err,data){
      if(err){
        res.end("数据库出错")
      }else{
        res.end("注册成功")
      }
    })
  })
  }
  if(pathname=='/login'){
    var postdata="";
    req.on("data", function (postDataChunk) {   
      postdata += postDataChunk;
    });
    
    req.on("end", function () {
      var params = querystring.parse(postdata);
      var username = params.username
      var password = params.password
      db.query(`select username,password from user_information where username='${username}'and password='${password}'`, function (err, data) {
        var x=JSON.stringify(data)
        console.log(data[0].username)
        res.write(JSON.stringify(data))
        if(data==undefined){
          res.end(JSON.stringify({status:"-1"}))
        }else{
          res.end(JSON.stringify({username:username,status:"1"}))
        }
    })
  })}

}).listen(8082)