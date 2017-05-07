var userDao = require("../db/UserDao");
exports.login = function(user, callback){
    userDao.findOne({userName:user.userName,password: user.password},function(err,res){
    // {userName:user.Username,password: user.password}
         if(!res){
            callback({
                retcode: "-1",
                retmsg : "登录失败！"
            })
        }else{
            callback({
                retcode:"0",
                retmsg: "success",
                data:user
            });
        }
    });
}