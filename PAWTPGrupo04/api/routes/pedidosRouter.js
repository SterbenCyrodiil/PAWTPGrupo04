const express = require('express');

const authorization = require('../middleware/authorization')

const requestController = require('../controllers/PedidoController')
const requestRouter = express.Router();

// Registo de novos pedidos de diagnóstico
requestRouter.post('/', authorization(['UTENTE']),requestController.fillPedido);
// Remoção de um pedido de diagnóstico existente
requestRouter.delete('/:id', authorization(['ADMIN']),requestController.deletePedido);

// Retorno de um pedido de diagnóstico relativo a um Utente
// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
requestRouter.get('/user/:id', authorization(['ADMIN', 'TECNICO', 'UTENTE']), requestController.getUserPedido);

// Qualquer administrador ou técnico pode aceder ao ficheiro de resultados de um pedido
// Download do ficheiro de resultados do diagnóstico
requestRouter.get('/download/:id', authorization(['ADMIN', 'TECNICO']), requestController.downloadResultsFile);

module.exports = requestRouter;