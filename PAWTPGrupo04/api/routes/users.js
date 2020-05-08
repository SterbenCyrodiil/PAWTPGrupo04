var express = require('express');
var userrouter = express.Router();

const userController = require('../controllers/UserController');
const requestController = require('../controllers/PedidoController')

/* GET users listing. */
userrouter.get('/', userController.getAllUsers);

userrouter.get('/:id', userController.getUserByID);

userrouter.post('/', userController.registerUser);

userrouter.delete('/', userController.deleteUser);

userrouter.get('/userreq/:id',requestController.getUserPedido); //Para teste, não sei se funcionará

userrouter.post('/', userController.registerUser);

module.exports = userrouter;