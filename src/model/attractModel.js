var attractDao = require("../db/attractDao");
var _ = require("lodash");
exports.getAttractList = function(pageNo,pagesize, callback){

    attractDao.count({},function(err, count){
            if(err){

            }else{
                if(count < pageNo *　pagesize){
                    callback({
                        retcode:　-1,
                        retmsg: "页码越界"
                    });
                }else{
                    attractDao.find({},null,{skip:(pageNo-1) * pagesize,limit:pagesize},function(err,res){
                        if(err){
                            callback({
                                retcode: "-1",
                                retmsg : "获取景点失败！"
                            });
                        }else{
                            callback({
                                retcode:"0",
                                retmsg: "success",
                                attractlist: _.map(res, '_doc'),
                                pageCount: Math.ceil(count/pagesize)
                            });
                        }
                    });

                }
            }
        }
    )

}