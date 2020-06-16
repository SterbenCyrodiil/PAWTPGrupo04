const express = require('express');

const authorization = require('../middleware/authorization')

const requestController = require('../controllers/PedidoController')
const requestRouter = express.Router();

/**
 * @swagger
 * /requests/:
 *   post:
 *     summary: Create and save a new Request
 *     description: Checks if the User is an 'utente' and if the request already exists, then saves the correct data do the DB
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/id'
 *       - $ref: '#/parameters/CCutente'
 *       - $ref: '#/parameters/trabalhadorDeRisco'
 *       - $ref: '#/parameters/grupoDeRisco'
 *       - $ref: '#/parameters/encaminhado_saude24'
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestRouter.post('/', authorization(['ADMIN', 'UTENTE']),requestController.fillPedido);

/**
 * @swagger
 * /requests/:
 *   delete:
 *     summary: Marks a specific entry in the DB for deletion, signaling for the DB manager
 *     description: Finds the Request related to the 'id' parameter and performs the delete task
 *     tags: [Pedidos]
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
 *               $ref: '#/definitions/PedidoInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestRouter.delete('/:id', authorization(['ADMIN']),requestController.deletePedido);

// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
/**
 * @swagger
 * /requests/utente/{id}:
 *   get:
 *     summary: Get requests in DB belonging to a certain user
 *     description: Gets the requests only if the user has it's session active, or the user is an 'admin'
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 *       403:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestRouter.get('/utente/:id', authorization(['ADMIN', 'UTENTE']), requestController.getUserPedidos);

/**
 * @swagger
 * /requests/utente/{id}/last:
 *   get:
 *     summary: Get last request made by a certain User
 *     description: Gets the request only if the user has it's session active, or the user is an 'admin'
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoInfo'
 *       403:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestRouter.get('/utente/:id/last', authorization(['ADMIN', 'UTENTE']), requestController.getUserPedido);

// ## Qualquer administrador ou técnico pode aceder ao ficheiro de resultados de um pedido
/**
 * @swagger
 * /requests/download/{id}:
 *   get:
 *     summary: Get File related to the Request for download
 *     description: Gets the File only if the User is an 'admin' or 'tecnico'
 *     tags: [Pedidos]
 *     produces:
 *       - application/pdf
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *     responses:
 *       200: 
 *         description: Task successful
 *         type: file
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestRouter.get('/download/:id', authorization(['ADMIN', 'TECNICO']), requestController.downloadResultsFile);

module.exports = requestRouter;