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
 * /users/utentes:
 *   get:
 *     summary: Gets all Users with role 'utente'
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserListing'
 */
userListRouter.get('/utentes', userController.getAllUtentes);
/**
 * @swagger
 * /users/tecnicos:
 *   get:
 *     summary: Gets all Users with role 'tecnico'
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserListing'
 */
userListRouter.get('/tecnicos', userController.getAllTecnicos);

// # Listagem por Utilizador unico (por Mongo _id ou por CC)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Gets a certain User using its MongoDB ObjectId
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userListRouter.get('/:id', userController.getUserByID);
/**
 * @swagger
 * /users/CC/{id}:
 *   get:
 *     summary: Gets a certain User using its Citizen Card Number
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userListRouter.get('/CC/:id', userController.getUserByCC);
/**
 * @swagger
 * /users/utente/{id}:
 *   get:
 *     summary: Gets a certain User 'utente' using its CC-id
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userListRouter.get('/utente/:id', userController.getUtenteUserByCC);
/**
 * @swagger
 * /users/tecnico/{id}:
 *   get:
 *     summary: Gets a certain User 'tecnico' using its CC-id
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userListRouter.get('/tecnico/:id', userController.getTecnicoUserByCC);

module.exports = userListRouter;