const express = require('express');

const authorization = require('../middleware/authorization')
const userController = require('../controllers/userController');
const userRouter = express.Router();

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create and save a new 'Utente' User into de DB
 *     description: Checks if the User CC already exists, then saves the correct data do the DB
 *     tags: [Users]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/cc'
 *       - $ref: '#/parameters/password'
 *       - $ref: '#/parameters/firstName'
 *       - $ref: '#/parameters/lastName'
 *       - $ref: '#/parameters/genero'
 *       - $ref: '#/parameters/birthdate'
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/phoneNumber'
 *     responses:
 *       200: 
 *         description: Task successful
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userRouter.post('/', userController.registerUser);

/**
 * @swagger
 * /users/tecnico:
 *   post:
 *     summary: Create and save a new 'Tecnico' User into de DB
 *     description: Checks if the User CC already exists, then saves the correct data do the DB
 *     tags: [Users]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/cc'
 *       - $ref: '#/parameters/password'
 *       - $ref: '#/parameters/firstName'
 *       - $ref: '#/parameters/lastName'
 *       - $ref: '#/parameters/genero'
 *       - $ref: '#/parameters/birthdate'
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/phoneNumber'
 *     responses:
 *       200: 
 *         description: Task successful
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userRouter.post('/tecnico', authorization(['ADMIN']), userController.registerUserTecnico);

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
userRouter.get('/:id', userController.getUserByID);

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
userRouter.get('/CC/:id', userController.getUserByCC);

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
userRouter.get('/:id/utente', userController.getUtenteUserByCC);

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
userRouter.get('/tecnico/:id', userController.getTecnicoUserByCC);

/**
 * @swagger
 * /users/role/{id}:
 *   put:
 *     summary: Updates a certain User's role
 *     description: Finds the User related to the 'id' parameter and performs the update task
 *     tags: [Users]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: role
 *         description: New role for the User
 *         schema:
 *           type: object
 *           properties:
 *             role:
 *               type: string
 *         required: true
 *     responses:
 *       200: 
 *         description: Task successful
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userRouter.put('/role/:id', authorization(['ADMIN']), userController.updateUserRole);

// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates a certain User searching by it's ID
 *     description: Only updates if the ID refers to a User with the session active or the logged User is an 'admin'
 *     tags: [Users]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - $ref: '#/parameters/updateUserInfo'
 *     responses:
 *       200: 
 *         $ref: '#/responses/UserUpdate'
 *       403:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userRouter.put('/:id', authorization(['ADMIN', 'UTENTE']), userController.updateUserInformation);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Marks a User entry in the DB for deletion, signaling for the DB manager
 *     description: Finds the User related to the 'id' parameter and performs the delete task
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *     responses:
 *       200: 
 *         description: Task successful
 *         schema:
 *           type: object
 *           properties:
 *             old:
 *               $ref: '#/definitions/UserInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
userRouter.delete('/:id', authorization(['ADMIN', 'UTENTE']), userController.deleteUser);

module.exports = userRouter;