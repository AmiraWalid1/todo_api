const  {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  type: {type: String, required: true, default: 'user', enum: ['admin', 'user']},
  createdAt: {type: Date, default: Date.now}
});

const User = model("user", userSchema);

module.exports = {User}
