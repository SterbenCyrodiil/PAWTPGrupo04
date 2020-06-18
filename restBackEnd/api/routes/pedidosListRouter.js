const express = require('express');

const requestController = require('../controllers/PedidoController')
const requestListRouter = express.Router();

/**
 * @swagger
 * /requests/:
 *   get:
 *     summary: Get all the requests in the DB
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/', requestController.getAllPedidos);

/* Listagem para Técnicos */
/**
 * @swagger
 * /requests/tecnico/{id}:
 *   get:
 *     summary: Get all unfinished requests belonging to a 'Tecnico'
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPathCC'
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/tecnico/:id', requestController.getTecnicoPedidos);

/**
 * @swagger
 * /requests/open/all:
 *   get:
 *     summary: Get all the unfinished Requests not belonging to any 'Tecnico'
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/open/all', requestController.getOpenPedidos);

/* Listagem por Pedido único */
/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get the specific request via ID
 *     description: Finds the Request related to the 'id' parameter and returns it's information
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoInfo'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestListRouter.get('/:id', requestController.getPedidobyID);

/* Listagem por Informação Prioritária */
/**
 * @swagger
 * /requests/saude24/all:
 *   get:
 *     summary: Get requests in DB in which users were sent by Saude24
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/saude24/all', requestController.getSaude24Pedidos);

/**
 * @swagger
 * /requests/grupoRisco/all:
 *   get:
 *     summary: Get requests in DB in which users belong to a Risk Group
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/grupoRisco/all', requestController.getGrupoRiscoPedidos);

/**
 * @swagger
 * /requests/trabalhadorRisco/all:
 *   get:
 *     summary: Get requests in DB in which users work in a Risk job
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/trabalhadorRisco/all', requestController.getTrabalhadoresRisco);

/* Listagem por Resultados de Diagnóstico */
/** ## DEPRECATED
 * swagger
 * /requests/infetados:
 *   get:
 *     summary: Get requests in DB in which users were infected at the time of the request
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
// requestListRouter.get('/infetados', requestController.getInfetados);

/**
 * @swagger
 * /requests/positivos/all:
 *   get:
 *     summary: Get requests in DB in which users were found positive
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/positivos/all', requestController.getPositivos);

/**
 * @swagger
 * /requests/negativos/all:
 *   get:
 *     summary: Get requests in DB in which users were found negative
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/negativos/all', requestController.getNegativos);

/**
 * @swagger
 * /requests/countDay/{id}:
 *   get:
 *     summary: Get the total number of Tests made in a certain day
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
 *             countPerDay:
 *               type: number
 */
requestListRouter.get('/countDay/:id', requestController.countPerDay);

module.exports = requestListRouter;