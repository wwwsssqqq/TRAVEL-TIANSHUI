const  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/biyesheji");

mongoose.connection.on("error", function(){
   console.error("connect error!");
});

mongoose.connection.on("open", function(){
    console.log("collection success");
});

module.exports = mongoose;

