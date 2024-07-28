const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) {
    return res.status(401).send("no token provided");
  }
  try {
    jwt.verify(token, process.env.SECRETKEY);
    next();
  }
  catch(err){
    next(err);
  }
  
};

module.exports = {authenticate};