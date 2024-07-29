const express = require('express');
const {Todo} = require('../models/todo')
const {authenticate} = require('../middlewares/authenticate');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.post('/', authenticate, async (req, res, next) => {

  const task = req.body;
  const newTodo = new Todo(task);
  console.log(newTodo);
  try{
    await newTodo.save(); 
    res.status(201).send(newTodo);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
