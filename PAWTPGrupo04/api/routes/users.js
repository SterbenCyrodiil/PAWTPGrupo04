var express = require('express');
var userrouter = express.Router();

const userController = require('../controllers/UserController');

/* GET users listing. */
userrouter.get('/', function(req, res, next) { //Aqui será para fazer login né?
  res.send('respond with a resource');
});

userrouter.post('/', function(req, res){
  userController.registerUser;
});

module.exports = userrouter;