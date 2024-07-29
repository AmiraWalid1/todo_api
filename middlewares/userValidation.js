const {
  body,
  param,
  query,
  header,
  check,
  validationResult
} = require("express-validator");
const {User} = require('../models/user');

const Registration = [
  body("name")
  .trim()
  .notEmpty().withMessage("name feild is required")
  .isLength({min: 2})
  ,
  body("email")
  .isEmail().withMessage('Please enter a valid email')
  .custom(async (email)=>{
    const existingUser = await User.findOne({email});
    if (existingUser){
      throw new Error('Email is already in use');
    }
  }),
  body("password")
  .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
  // .matches(/\d/)
];

module.exports = {Registration}