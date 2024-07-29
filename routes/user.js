const express = require('express');
const {User} = require('../models/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticate, authrization} = require('../middlewares/authenticate')
const {Registration, Login} = require('../middlewares/userValidation');
const { validationResult } = require('express-validator');
const {sendMail} = require('../mail');
const router = express.Router();

router.get('/',authenticate, authrization,async(req, res) => {
  const todos = await User.find();
  res.status(200).send(todos);
});


router.post('/signup',Registration, async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors);
  }

  const {name, email, password, type} = req.body;
  const passwordEncrypted = await bcryptjs.hash(password, 10);
  const newUser = new User({name, email, password: passwordEncrypted, type});  
  try{
    await newUser.save();
    sendMail('Registration Sucess',newUser.email, emailBodyOfRegistration(newUser));
    res.status(201).send(newUser);
  } catch(err) {
    next(err);
  }
});

router.put('/login', Login, async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors);
  }

  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user){
    return next(err);
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  
  if (!isMatch){
    res.status(401).send("Not Authenticated");
  }
  else {
    const token = jwt.sign({id: user._id, type: user.type}, process.env.SECRETKEY, { expiresIn: '1h' });
    res.send({token});
  }
  
});

function emailBodyOfRegistration(user){
  return `
  Dear ${user.name},
  Thank you for registering with TODO! We are excited to have you join our community.
  To get started, please log in to your account using your registered email and password.
  Here are your registration details:
  - Name: ${user.name},
  - Email: ${user.email},
  If you have any questions or need assistance, feel free to contact our support team.
  Best regards,
  The TODO Team

  ---

  This email was sent to ${user.email}, because you registered for an account on TODO
  If you did not register, please ignore this email.
  `;
};

module.exports = router;
