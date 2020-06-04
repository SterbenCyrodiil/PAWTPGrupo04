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

/* Listagem por Pedido único */
/**
 * @swagger
 * /request/{id}:
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
 * /requests/saude24:
 *   get:
 *     summary: Get requests in DB in which users were sent by Saude24
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/saude24', requestController.getSaude24Pedidos);

/**
 * @swagger
 * /requests/gruposrisco:
 *   get:
 *     summary: Get requests in DB in which users belong to a Risk Group
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/gruposrisco', requestController.getGrupoRiscoPedidos);

/**
 * @swagger
 * /requests/trabalhadores:
 *   get:
 *     summary: Get requests in DB in which users work in a Risk job
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/trabalhadores', requestController.getTrabalhadoresRisco);

/* Listagem por Resultados de Diagnóstico */
/**
 * @swagger
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
requestListRouter.get('/infetados', requestController.getInfetados);

/**
 * @swagger
 * /requests/testespositivos:
 *   get:
 *     summary: Get requests in DB in which users were found positive
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/testespositivos', requestController.getPositivos);

/**
 * @swagger
 * /requests/testesnegativos:
 *   get:
 *     summary: Get requests in DB in which users were found negative
 *     tags: [Pedidos]
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoListing'
 */
requestListRouter.get('/testesnegativos', requestController.getNegativos);

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