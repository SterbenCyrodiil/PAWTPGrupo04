const express = require('express');

const userController = require('../controllers/userController');
const userrouter = express.Router();

/* GET users listing. */
userrouter.get('/', userController.getAllUsers);

userrouter.get('/utentes',userController.getAllUtentes);
userrouter.get('/tecnicos', userController.getAllTecnicos);
userrouter.get('/utentes/:id', userController.getUtenteUserByCC); // ID => CC
userrouter.get('/tecnicos/:id', userController.getTecnicoUserByCC);
userrouter.get('/:id', userController.getUserByID);

userrouter.put('/:id', userController.updateUserInformation);

userrouter.post('/', userController.registerUser);

userrouter.delete('/:id', userController.deleteUser);

//userrouter.get('/userreq/:CC',requestController.getUserPedido); //Funciona, provavelmente deprecated

module.exports = userrouter;