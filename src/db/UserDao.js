var mongoose = require("./db");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String},
    name: {type: String},
    password: {type: String},
});

module.exports =  mongoose.model("User",UserSchema);

