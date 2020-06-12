const express = require('express');

const userController = require('../controllers/userController');
const userListRouter = express.Router();

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all the users in the DB
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserListing'
 */
userListRouter.get('/', userController.getAllUsers);

// # Listagem por Role
/**
 * @swagger
 * /users/utentes/all:
 *   get:
 *     summary: Gets all Users with role 'utente'
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserListing'
 */
userListRouter.get('/utentes/all', userController.getAllUtentes);
/**
 * @swagger
 * /users/tecnicos/all:
 *   get:
 *     summary: Gets all Users with role 'tecnico'
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserListing'
 */
userListRouter.get('/tecnicos/all', userController.getAllTecnicos);

module.exports = userListRouter;