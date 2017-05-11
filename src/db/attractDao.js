var mongoose = require("./db");
var Schema = mongoose.Schema;

var attractSchema = new Schema({
    id: {type: Number},
    attractname: {type: String},
    level: {type: String},
    content:{type: String},
    score:{type:String}
});

module.exports =  mongoose.model("attract",attractSchema,"attract");

