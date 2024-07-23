const mongoose = require('mongoose'); 
const dotenv = require('dotenv')
const db = "TODO";

dotenv.config({path:'./.env'});

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log("Mongodb connection error: ", err)
    })
};

module.exports = {connectDB};
