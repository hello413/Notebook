# FotNote
与舍友合作的小项目

#### 介绍

一个包含Markdown语法的笔记本，可用来记录自己的日常与笔记。

### 目录

* 需求
* 技术
* 数据库设计
* 前端页面
* 接口文档

##### 需求：

1. 笔记的增删改查
2. 用户注册登录
3. 用户首页的展示

##### 技术：

* 后端：node.js
* 前端交互：html+css+js+ajax
* 数据库：mysql

##### 数据库设计

|      User表      |             |                            |                          |
| :--------------: | :---------: | :------------------------: | :----------------------: |
|       参数       |    类型     |            备注            |           说明           |
|     username     | varchar(11) |      unique,not null       | 用户名，不能为空不能重复 |
|     password     | varchar(11) |          not null          |       密码不能为空       |
|       sex        | varchar(4)  |                            |           性别           |
|       age        |     int     |                            |           年龄           |
| personal_profile |  TINYTEXT   |                            |    个人简介/自我励志     |
|       u_id       |     int     | AUTO_INCREMENT,primary key |   标识用户主键，自增长   |

|   Note表    |             |                            |            |
| :---------: | :---------: | :------------------------: | :--------: |
|    参数     |    类型     |            备注            |    说明    |
|    n_id     |     int     | AUTO_INCREMENT,primary key |   笔记id   |
|  notename   | varchar(32) |          not null          |   笔记名   |
|     tag     | varchar(32) |                            |  笔记标签  |
|   user_id   |     int     |          not null          | 关联用户id |
| notecontent |  TINYTEXT   |                            |  笔记内容  |

##### 前端

* 登录![login](C:\Users\apple\Desktop\picture\login.png)
* 注册![register](C:\Users\apple\Desktop\picture\register.png)
* 主页![index](C:\Users\apple\Desktop\picture\index.png)
* 写笔记![write](C:\Users\apple\Desktop\picture\write.png)
* 读笔记![read](C:\Users\apple\Desktop\picture\read.png)



#                      笔记本项目API文档

​                             所有接口返回值中的status代表成功或是失败，1为成功，-1为失败

## 功能:注册

#### URL：/reg

#### 请求方式:post/get

#### 参数列表:

| 参数名称         | 类型   |
| ---------------- | ------ |
| username         | String |
| password         | String |
| sex              | String |
| age              | int    |
| Personal profile | String |

## 返回值

 #### #成功

  {

​        msg:"login was successful",

​        status:1,		

​         data:"" 

   }

#### #失败

{

​        msg:"User name already exists,login has failed",

​        status:-1,

​         data:""

}

## 功能:登录

#### URL：/login

#### 请求方式:post/get

#### 参数列表:

| 参数名称 | 类型   |
| -------- | ------ |
| username | String |
| password | String |

## 返回值

 #### #成功

  {

​        msg:"login was successful",

​        status:1

   }

#### #失败

{

​        msg:"User name already exists,login has failed",

​        status:-1,

​         data:"[{username:"xxxxx",sex:"xx",age:"xx",Personal profile:"xxxxx"}]"

}

## 功能:笔记内容保存

#### URL：/save

#### 请求方式:post/get

#### 参数列表:

| 参数名称     | 类型                                             |
| ------------ | ------------------------------------------------ |
| username     | String                                           |
| note_content | JSON([title:"xxx",savetime:"xxx",content:"xxx"]) |

## 返回值

#### #成功

{

​       msg:"Notes saved successfully",

​       status:1,

​       data:""

}

#### #失败

{

​       msg:"The title already exists，failed to save notes",

​       status:-1

}

## 功能:修改笔记内容

#### URL：/update

## 请求方式:post/get

#### 参数列表:

| 参数名称     | 类型                                             |
| ------------ | ------------------------------------------------ |
| username     | String                                           |
| note_content | JSON([title:"xxx",savetime:"xxx",content:"xxx"]) |

## 返回值

#### #成功

{

​       msg:"Notes update successfully",

​       status:1

}

#### #失败

{

​       msg:"Failed to update notes",

​       status:-1

}



## 功能:删除笔记

#### URL：/delete

#### 请求方式:post/get

#### 参数列表:

| 参数名称 | 类型   |
| -------- | ------ |
| username | String |
| title    | String |

#### #成功

{

​       msg:"Notes delete successfully",

​       status:1

}

#### #失败

{

​       msg:"Failed to delete notes",

​       status:-1

}



## 功能:查询笔记

#### URL：/query

#### 请求方式:post/get

#### 参数列表:

| 参数名称 | 类型   |
| -------- | ------ |
| username | String |
| title    | String |

#### #成功

{

​       status:1

​       data:[title:"xxxx",content:"xxxxxx"]

}

#### #失败

{

​       msg:"Query failed, no such file",

​       status:-1

}



