const {
  body,
  param,
  query,
  header,
  check,
  validationResult
} = require("express-validator");
const {User} = require('../models/user');


const createTodo = [
  body("title")
    .notEmpty().withMessage('title feild is required')
  ,body("user")
    .isMongoId().withMessage('User field must be a valid ObjectId')
    .custom(async (userId)=>{
      const user = await User.findById(userId);
      if(!user){
        throw new Error('User does not exist');
      }
    })
  ,body("description")
    .optional()
    .isString().withMessage('Description must be a string')
  ,body("filePath")
    .optional()
    .isString().withMessage('filePath must be a string')
];

module.exports = {createTodo};