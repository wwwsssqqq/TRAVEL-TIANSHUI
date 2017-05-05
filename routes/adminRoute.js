var express = require("express");
var admin = new express.Router();



admin.get('/attractlist',function(req, res){
    res.render("admin/attractlist");
});


admin.get('/foodlist',function(req, res){
    res.render("admin/foodlist");
});



module.exports = admin;