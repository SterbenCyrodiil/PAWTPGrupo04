const express = require('express');

const userController = require('../controllers/userController');
const userListRouter = express.Router();

// Listagens de Utilizadores
userListRouter.get('/', userController.getAllUsers);
/* Listagem por Role */
userListRouter.get('/utentes', userController.getAllUtentes);
userListRouter.get('/tecnicos', userController.getAllTecnicos);
/* Listagem por Utilizador unico (por Mongo _id ou por CC) */
userListRouter.get('/:id', userController.getUserByID);
userListRouter.get('/CC/:id', userController.getUserByCC);
userListRouter.get('/utentes/:id', userController.getUtenteUserByCC);
userListRouter.get('/tecnicos/:id', userController.getTecnicoUserByCC);

module.exports = userListRouter;