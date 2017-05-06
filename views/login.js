var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");

http.createServer(function (req , res) {
//设置请求头
    res.setHeader("Access-Control-Allow-Origin","*");
    if(req.method == "POST"){
        //接收发来的用户名和密码
        var result = "";
//获取前端代码发来的路由地址
        var pathName = url.parse(req.url).pathname;
        req.addListener("data",function (chunk) {
            result += chunk;
        });

        req.on("end" , function () {
            var user = qs.parse(result);
            //判断用户是否存在
            if(user.username){
                fs.readFile("./db.txt" , "utf-8" , function (err,data) {
                    if (!err){
                        console.log("读取文件成功");
                        if (!data){
                            if(pathName == "/login"){
                                res.end("该用户不存在");
                                return;
                            }
//根据前端发来的路由地址判断是登录还是注册页面，如果是注册页面
                            if(pathName == "/register"){
//创建一个数组一个对象来保存帐号和密码
                                var arr = [];
                                var obj = {};
//把用户的帐号密码保存
                                obj.username = user.username;
                                obj.password = user.password;
                                arr.push(obj);
//同步写入db.txt文件，必须是同步进行
                                fs.writeFileSync("./db.txt" , JSON.stringify(arr) , "utf-8");
                                res.end("注册成功!");
                                return;
                            }
                        }else {
                            console.log("文件中有数据");
//把数据转成JSON对象，以便我们使用
                            var arr = JSON.parse(data);
//遍历整个保存数据的数组 判断登录注册
                            for(var i = 0;i < arr.length;i++){
                                var obj = arr[i];
                                if(obj.username == user.username){
                                    if(pathName == "/login"){
                                        if (obj.password == user.password){
                                            res.end("登录成功!");
                                            return;
                                        }else {
                                            res.end("密码错误！");
                                            return;
                                        }
                                    }
                                    if(pathName == "/register"){
                                        res.end("该用户已存在!");
                                        return;
                                    }
                                }
                            }
                            if(pathName == "/login"){
                                res.end("用户名不存在!");
                                return;
                            }
                            if(pathName == "/regist"){
//创建新对象写入数据
                                var obj = {};
                                obj.username = user.username;
                                obj.password = user.password;
                                arr.push(obj);
                                fs.writeFileSync("db.txt" , JSON.stringify(arr) , "utf-8");
                                res.end("注册成功!");
                                return;
                            }
                        }
                    }else {
                        console.log("读取文件失败");
                    }
                })
            }
        });
    }else {
        res.end("get请求");
    }
}).listen(3000 , function (err) {
    if (!err){
        console.log("服务器启动成功，正在监听port3000...");
    }
});