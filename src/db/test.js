var User = require("./UserDao");


function saveTest(){

    var user = new User({
        name: "puhuijie",
        username: "puhui",
        password : "jie",
        age:28
    });
    user.save(function(err, res){
        if(err){
            console.error(err);
        }else{
            console.log(`insert success ${res}`);
        }
    });
    User.create({name: "wangshiqiao"}, function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log(`insert success ${res}`);
        }
    });
}

// saveTest();
// queryTest()
// queryTest1();
// updateTest();
// removeTest();
// init();
updateTypid();
/**/
function queryTest(option){
    var query = User.findOne({name:"puhuijie"});
    query.select(" username password");
    query.exec( function(err, userInfo){
        if(err){console.log(err);}
        else{
            console.log(`username:${userInfo.username}\t password:${userInfo.password}`);
        }
    });
}

function queryTest1(){
    User.find({"username":"hha"}).where('age').gt(18).lt(60).sort('-age').exec(function(err,userInfo){
        if(err){console.log(err);}
        else{
            console.log(`userinfo:${userInfo}`);
            // console.log(`username:${userInfo.username}\t password:${userInfo.password}`);
        }
    });
}

function updateTest(){
    var wherestr = {'name' : 'test49'};
    var updatestr = {'age': 'haha'};

    User.update(wherestr,updatestr,{multi:true},function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });

}

function updateTypid(){
    User.find({name:"test49"},function(err,res){
        if(err){
            console.log("error:"+err);
        }else{
            User.findOneAndUpdate(res,{age:"23"},function(err1,ress){
                if(err1){
                    console.log("error:"+ err1);
                }else{
                    console.log("res:" + ress);
                }
            })
        }
    })


}


function removeTest(){
    User.remove({},function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
}

function init(){

    for(var i  =0;i< 100;i++){
        var user = new User({
            name: "test"+i,
            username : "test"+ Math.random(),
            age: i
        })
        user.save();
    }

}


