const express = require('express');
const cors = require('cors');
const todo = require('./routes/todo')
const user = require('./routes/user')
const morgan = require('morgan');


const app = express();

// cors policy [enable]
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.use('/users', user);
app.use('/todos', todo);


app.use('/*', (req, res)=>{
  res.sendStatus(404);
})
module.exports = {app};
