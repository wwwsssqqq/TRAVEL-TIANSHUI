var testDao = require("../db/testDao1");


exports.queryAllUser = function (callback){
    testDao.queryTest(function(err,result){
        if(err){
            console.log("query failed!");
            callback(err);
        }else{
            callback(err,result);
        }
    });
};

exports.getUserByName = function (name,callback){
    testDao.queryByName(name, function(err,result){
        if(err){
            console.log("queryuserByname failed!");
            callback(err);
        }else{
            callback(err,result);
        }
    })
};

exports.add = function(user,callback){
    testDao.add(user.name,user.age,user.sex,user.address,function(err,result){
         if(err){
             callback(err);
         }else{
             callback(err,result);
         }
    });
}