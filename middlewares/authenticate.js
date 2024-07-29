const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log(token);
  if(!token) {
    return res.status(401).send("no token provided");
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.SECRETKEY);
    // console.log(tokenDecode);
    // console.log(tokenDecode.type);
    req.user = tokenDecode;
    next();
  }
  catch(err){
    next(err);
  }
  
};

const authrization = (req, res, next) => {
  if (req.user.type === 'admin'){
    next()
  } else {
    res.status(401).send("NOT authrization");
  }
};

module.exports = {authenticate, authrization};