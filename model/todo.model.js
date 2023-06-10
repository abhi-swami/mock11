const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  subject: {type:String,isrequired:true},
  title: {type:String,isrequired:true},
  created_on: String,
  done_on: String,
  userId:String,
  status:Boolean
},{versionKey:false});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };
