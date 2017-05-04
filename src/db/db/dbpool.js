var dbconfig = require("../../config/dbconfig");
var mysql = require("mysql");

var pool = null;

exports.getPool = function(){
    if(!pool){
        console.log("创建数据库链接！");
        pool = mysql.createPool(dbconfig.db);
    }
    return pool;
};
