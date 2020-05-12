const express = require('express');

const authorization = require('../middleware/authorization')
const userController = require('../controllers/userController');
const userrouter = express.Router();

/* GET users listing. */
userrouter.get('/', authorization(['admin']),userController.getAllUsers);

userrouter.get('/utentes', authorization(['admin', 'tecnico']), userController.getAllUtentes);
userrouter.get('/tecnicos', authorization(['admin']), userController.getAllTecnicos);
userrouter.get('/utentes/:id', authorization(['admin', 'tecnico', 'utente']), userController.getUtenteUserByCC); // ID => CC
userrouter.get('/tecnicos/:id', authorization(['admin']), userController.getTecnicoUserByCC);
userrouter.get('/:id', authorization(['admin']), userController.getUserByID);

userrouter.put('/:id', authorization(['admin', 'utente']), userController.updateUserInformation);

userrouter.post('/', userController.registerUser);

userrouter.delete('/:id', authorization(['admin', 'utente']), userController.deleteUser);

//userrouter.get('/userreq/:CC',requestController.getUserPedido); //Funciona, provavelmente deprecated

module.exports = userrouter;