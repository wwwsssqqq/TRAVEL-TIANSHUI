const util = require('util');
const express = require('express');
// const logUtil = require('../src/utils/log');

const router = express.Router();
// const logger = logUtil.getLogger('indexRouter');

const multiparty = require("multiparty");
const path = require("path");

const  callfile = require('child_process');

const fs = require("fs");

router.get('/', function(req, res){
    res.render('index');
});

router.get('/logout', function(req, res) {
    res.redirect('http://ssa.jd.com/sso/login?ReturnUrl='
        + encodeURIComponent('http://wqadmin.jd.com/exactpush/index#home'))
});

router.get("/download",function(req,res){
    res.sendFile(path.resolve(__dirname,"../public/files/helpdoc.docx"),function(err,res){
        console.log(err);
    });
});

router.post("/upload", function(req,res){
    logger.info("/upload");
    //生成multiparty对象，并配置上传目标路径
    console.log(__dirname);
    var erp = req.cookies.exactpush_username;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var time = [year,month,day,hour,minute,seconds].join("");

    var form = new multiparty.Form({uploadDir: path.join(__dirname,"../","public","files")});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        if(err){
            logger.error("上传失败", err);
            res.json({retcode: 1, message: '上传失败,' + err});
            return false;
        }
        logger.info(files);
        var newfilename = files.file[0].originalFilename.split(".")[0] + "_" + erp + "_" + time + ".csv";
        console.log(newfilename);
        fs.rename(files.file[0].path , path.resolve(__dirname,"../public/files/",newfilename),function(err){
            if(err){
                console.log(err);
                res.json({
                    retcode: -1,
                    message:"upload fail!"
                }).end();
            }else{
                console.log("execFile", path.resolve( __dirname, "../public/files/", newfilename));
                callfile.execFile(path.resolve(__dirname, "../config/scpFile.sh") ,["10.187.101.10", path.resolve( __dirname, "../public/files/", newfilename), path.resolve("/export/pushtool_data/",newfilename)], function(err,stdout,stderr){
                    if (err) {
                        console.log("error:::*********************");
                        console.log(err);
                        res.json({
                            retcode: -1,
                            message: "exec scpFile failed!"
                        });
                    } else {
                        console.log("+++++++++++++++++++++++++++", path.resolve( __dirname, "../public/files/", newfilename));
                        console.log(stdout);
                        console.log(stderr);
                        callfile.execFile(path.resolve(__dirname, "../config/scpFile.sh") ,["10.191.217.32", path.resolve( __dirname, "../public/files/", newfilename), path.resolve("/export/pushtool_data/",newfilename)], function(err,stdout,stderr) {
                            if(err){
                                console.log("error:::*********************");
                                console.log(err);
                            }else{
                                console.log("+++++++++++++++++++++++++++", path.resolve( __dirname, "../public/files/", newfilename));
                                console.log(stdout);
                                console.log(stderr);
                                res.json({
                                    retcode: 0,
                                    message: '',
                                    filename: newfilename
                                });
                            }
                        });
                    }
                })
            }
        });
    });
});

module.exports = router;