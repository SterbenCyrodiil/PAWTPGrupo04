const express = require('express');

const authorization = require('../middleware/authorization')
const userController = require('../controllers/userController');
const userRouter = express.Router();

// Registo de um novo User
userRouter.post('/', userController.registerUser);

// Atualização dos dados de um utilizador
// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
userRouter.put('/:id', authorization(['ADMIN']), userController.updateUserRole);
// ## Rota abaixo só funciona se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
userRouter.put('/:id', authorization(['ADMIN', 'UTENTE']), userController.updateUserInformation);

// Delete User
userRouter.delete('/:id', authorization(['ADMIN', 'UTENTE']), userController.deleteUser);

module.exports = userRouter;