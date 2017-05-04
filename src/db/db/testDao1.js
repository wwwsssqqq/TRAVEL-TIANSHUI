var pool = require("./dbpool").getPool();
exports.queryTest = function(callback){
    var sql = "select * from test";
    pool.query(sql,function(err,results,fields){
        if(err){
            console.log("query err!");
            callback(err);
        }
        callback(err,results);
    });
};

exports.queryByName = function(name,callback){
    var sql = 'select * from test where name = ?';
    pool.query(sql,[name],function(err, results, fields){
        if(err){
            console.log("query err!");
            callback(err);
        };
        callback(err,results);
    });
};

exports.add = function(name,age,sex,address,callback){
    var sql = "insert into test values(?,?,?,?)";
    pool.query(sql,[name,age,sex,address], function(err,results,fields){
        if(err){
            console.log("insert into test err!");
           callback(err);
        }
        callback(err,results);
    });
};
