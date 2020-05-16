const express = require('express');

const authorization = require('../middleware/authorization')
const userController = require('../controllers/userController');
const userrouter = express.Router();

// Listagens de Utilizadores
userrouter.get('/', authorization(['admin']),userController.getAllUsers);
/* Listagem por Role */
userrouter.get('/utentes', authorization(['admin', 'tecnico']), userController.getAllUtentes);
userrouter.get('/tecnicos', authorization(['admin']), userController.getAllTecnicos);
/* Listagem por Utilizador unico (por Mongo _id ou por CC) */
userrouter.get('/:id', authorization(['admin']), userController.getUserByID);
userrouter.get('/CC/:id', authorization(['admin']), userController.getUserByCC);
userrouter.get('/utentes/:id', authorization(['admin', 'tecnico']), userController.getUtenteUserByCC);
userrouter.get('/tecnicos/:id', authorization(['admin']), userController.getTecnicoUserByCC);

// Registo, atualização e remoção de Utilizadores
userrouter.post('/', userController.registerUser);
userrouter.put('/:id', authorization(['admin', 'utente']), userController.updateUserInformation);
userrouter.delete('/:id', authorization(['admin', 'utente']), userController.deleteUser);

module.exports = userrouter;