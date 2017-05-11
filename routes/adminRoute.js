var express = require("express");
var admin = new express.Router();
var loginModel = require("../src/model/adminModel");
var attractModel = require("../src/model/attractModel");
admin.get('/login', function(req,res){
   var userName = req.query.userName;
   var password = req.query.password;
   var rurl = req.rurl;
   if(userName && password){
        loginModel.login({
            userName: userName,
            password: password
        }, function(response){
            if(response.retcode == 0){
                res.cookie("userName",response.data.userName);
                res.json({
                    retcode:0,
                    retmsg :"success"
                });
                res.end();
            }else{
                res.json(response);
            }
        })
   }else{
       res.json({
           retcode: "-1",
           retmsg : "参数错误"
       })
   }
});

admin.get('/*',function(req,res,next){
   var  cookie  = req.cookies && req.cookies.userName;
   if(cookie){
       next();
   }else{
       res.redirect("/admin/login.html");
   }
});

admin.get('/attractlist',function(req, res){
    var pageIndex = req.query.pageIndex ||1;
    var pageSize = req.query.pageSize || 3;
    var userName = req.cookies.userName;
    attractModel.getAttractList(pageIndex,pageSize,function(data){
        res.render("admin/attractlist",{attractlist: data.attractlist, pageCount: data.pageCount,currentPage:pageIndex, userName:userName});
    });
});

admin.get('/foodlist',function(req, res){
    var userName = req.cookies.userName;
    res.render("admin/foodlist",{userName: userName});
});

admin.get('/test', function(req,res){
   console.log(req.header.cookie);
   res.cookie("username","wangshiping");
   res.json({});
});

module.exports = admin;