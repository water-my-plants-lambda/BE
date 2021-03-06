const jwt = require('jsonwebtoken');
const secret = require('../data/secret').jwtSecret;
const userDb = require('../data/userModel');
const plantsDb = require('../data/plantsModel');
const jwtKey = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

module.exports = {
  authenticate, generateToken, validUserId, validUser, validPlantId, checkForPlantOwner
};

function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if(token) {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) return res.status(401).json({error:err});
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
}
function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options);
}

async function validUser(req, res, next){
  try{
    const userId = req.decoded.subject;
    const urlId = parseInt(req.params.id);
    if(userId !== urlId){
      res.status(403).json({error: 'You are not authorized'})
    } else {
      next();
    }
  } catch (err){
    res.status(500).json({message: 'An error occured', err})
  }
}

async function validUserId(req, res, next){
  try{
    const user = await userDb.findById(req.params.id);
    if(!user){
      res.status(400).json({error: 'This Id is not in the database'});
    } else {
      next();
    }
  } catch(err){
    console.log(err);
  }
}

async function checkForPlantOwner(req, res, next){
  const {id} = req.params;
  const plant = await plantsDB.findById(id);
  const userId = req.decoded.subject;

  if(!plant) {
    res.status(400).json({error: 'Thw plant id is not in the database'});
  } else {
   next();
  }
}

async function validPlantId(req, res, next){
  try{
    const plant = await plantsDb.findById(req.params.id);
    if(!plant){
      res.status(400).json({error: 'This ID is not in the database'})
    } else {
      next();
    }
  } catch(err){
    console.log(err);
  }
}
