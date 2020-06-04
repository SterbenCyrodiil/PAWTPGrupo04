const express = require('express');

const authorization = require('../middleware/authorization')
const userController = require('../controllers/userController');
const userRouter = express.Router();

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Create and save a new User into de DB
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
 * /user/{id}:
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
userRouter.put('/:id', authorization(['ADMIN']), userController.updateUserRole);

// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
/**
 * @swagger
 * /user/{id}:
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
 * /user/{id}:
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