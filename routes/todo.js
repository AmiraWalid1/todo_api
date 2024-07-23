const express = require('express');
const {Todo} = require('../models/todo')
const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.post('/', async (req, res) => {

  const {title, user} = req.body;
  const newTodo = new Todo({title, user});
  console.log(newTodo);
  try{
    await newTodo.save(); 
    res.status(201).send(newTodo);
  } catch {
    res.status(404).send("Required field not exists");
  }
});

module.exports = router;
