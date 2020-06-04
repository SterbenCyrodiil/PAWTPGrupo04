const express = require('express');

const requestController = require('../controllers/PedidoController')
const requestListRouter = express.Router();

// Listagens de Pedidos
requestListRouter.get('/', requestController.getAllPedidos);
/* Listagem por Informação Prioritária */
requestListRouter.get('/saude24', requestController.getSaude24Pedidos);
requestListRouter.get('/gruposrisco', requestController.getGrupoRiscoPedidos);
requestListRouter.get('/trabalhadores', requestController.getTrabalhadoresRisco);
/* Listagem por Resultados de Diagnóstico */
requestListRouter.get('/infetados', requestController.getInfetados);
requestListRouter.get('/testespositivos', requestController.getPositivos);
requestListRouter.get('/testesnegativos', requestController.getNegativos);
requestListRouter.get('/countDay/:id', requestController.countPerDay);
/* Listagem por Pedido único */
requestListRouter.get('/:id', requestController.getPedidobyID);

module.exports = requestListRouter;