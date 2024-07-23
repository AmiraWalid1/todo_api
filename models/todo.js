const  mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  completed: {type: Boolean, default: false},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = {Todo}