const express = require('express');
const {Todo} = require('../models/todo')
const {authenticate} = require('../middlewares/authenticate');
const {createTodo} = require("../middlewares/todoValidation")
const { validationResult } = require('express-validator');
const multer = require("multer");
const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: "files",
    filename: (req, file, func)=>{
      func(null, file.originalname);
    }
  })
});


router.get('/', authenticate, async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.post('/', upload.array("filePath") , createTodo, authenticate, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  
  // console.log(req.files);
  const task = req.body;
  task['filePath'] = req.files[0].destination;
  const newTodo = new Todo(task);
  // console.log(newTodo);
  try{
    await newTodo.save(); 
    res.status(201).send(newTodo);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
