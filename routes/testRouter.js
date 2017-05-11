var express = require("express");
var testmodel = require("../src/model/testmodel");
var router = express.Router();



router.get("/getalluser",function(req,res){
    testmodel.queryAllUser(function(err,result){
        if(err){
            res.json({retcode: -1, retmsg : "queryfailed!"});
            res.end();
        }else{
            res.json({retcode: 0, retmsg : "success", data: result});
        }
    });
});

router.post("/adduser",function(req,res){
    var user = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address
    };
    testmodel.add(user,function(err,result){
        if(err){
            res.json({retcode: -1, retmsg: "insert failed!"});
        }else{
            res.json({retcode: 0, retmsg: "success"});
        }
    });
});

router.get("/adduser",function(req,res){
    var user = {
        name: req.query.name,
        age: req.query.age,
        sex: req.query.sex,
        address: req.query.address
    };
    testmodel.add(user,function(err,result){
        if(err){
            res.json({retcode: -1, retmsg: "insert failed!"});
        }else{
            res.json({retcode: 0, retmsg: "success"});
        }
    });
});

module.exports = router;

