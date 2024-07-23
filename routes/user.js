const express = require('express');
const {User} = require('../models/user')
const router = express.Router();

router.get('/', async(req, res) => {
  const todos = await User.find();
  res.status(200).send(todos);
});


router.post('/', async(req, res) => {
  const {name, email, password} = req.body;
  const newUser = new User({name, email, password});
  await newUser.save();
  res.status(201).send(newUser);
});

module.exports = router;
