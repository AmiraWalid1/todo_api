const express = require('express');
const {User} = require('../models/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticate} = require('../middlewares/authenticate')
const {Registration} = require('../middlewares/userValidation');
const { body,validationResult } = require('express-validator');
const router = express.Router();

router.get('/',authenticate, async(req, res) => {
  const todos = await User.find();
  res.status(200).send(todos);
});


router.post('/signup',Registration, async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty){
    return res.status(400).json(errors);
  }

  const {name, email, password, type} = req.body;
  const passwordEncrypted = await bcryptjs.hash(password, 10);
  const newUser = new User({name, email, password: passwordEncrypted, type});  
  try{
    await newUser.save();
    res.status(201).send(newUser);
  } catch(err) {
    next(err);
  }
});

router.put('/login', async(req, res, next) => {
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
    const token = jwt.sign({id: user._id}, process.env.SECRETKEY, { expiresIn: '1h' });
    res.send({token});
  }
  
});

module.exports = router;
