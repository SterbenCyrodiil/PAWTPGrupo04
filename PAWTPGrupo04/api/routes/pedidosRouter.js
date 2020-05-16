const express = require('express');

const authorization = require('../middleware/authorization')
const requestController = require('../controllers/pedidoController')
const requestrouter = express.Router();

// Listagens de Pedidos
requestrouter.get('/', authorization(['admin', 'tecnico']), requestController.getAllPedidos);
/* Listagem por Informação Prioritária */
requestrouter.get('/saude24', authorization(['admin', 'tecnico']), requestController.getSaude24Pedidos);
requestrouter.get('/gruposrisco', authorization(['admin', 'tecnico']), requestController.getGrupoRiscoPedidos);
requestrouter.get('/trabalhadores', authorization(['admin', 'tecnico']), requestController.getTrabalhadoresRisco);
/* Listagem por Resultados de Diagnóstico */
requestrouter.get('/infetados', authorization(['admin', 'tecnico']), requestController.getInfetados);
requestrouter.get('/testespositivos', authorization(['admin', 'tecnico']), requestController.getPositivos);
requestrouter.get('/testesnegativos', authorization(['admin', 'tecnico']), requestController.getNegativos);
requestrouter.get('/countDay/:id', authorization(['admin', 'tecnico']), requestController.countPerDay);
/* Listagem por Pedido único */
requestrouter.get('/:id', authorization(['admin', 'tecnico']), requestController.getPedidobyID);
// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
requestrouter.get('/user/:id', authorization(['admin', 'tecnico', 'utente']), requestController.getUserPedido);

// Registo de novos pedidos de diagnóstico
requestrouter.post('/', authorization(['utente']),requestController.fillPedido);

// ## Este método permitiria atualizar os dados de um pedido, no entanto foi substituido pela abordagem à frente ## Deprecated
// ## requestrouter.put('/:id',  authorization(['admin']), requestController.updatePedido);

// Atualização do estado de um pedido de diagnóstico
requestrouter.put('/update/firstDate/:id', authorization(['admin', 'tecnico']),
    requestController.updateDataPrimeiroTeste);
requestrouter.put('/update/firstTest/:id', authorization(['admin', 'tecnico']),
    requestController.updateResultadoPrimeiroTeste);
    requestrouter.put('/update/secondDate/:id', authorization(['admin', 'tecnico']),
    requestController.updateSegundaData);
requestrouter.put('/update/secondTest/:id', authorization(['admin', 'tecnico']),
    requestController.updateResultadoSegundoTeste);
requestrouter.put('/update/filepath/:id', authorization(['admin', 'tecnico']),
    requestController.updateFilePath);
// Atualização do técnico responsável pelo pedido de diagnóstico
requestrouter.put('/update/worker/:id',  authorization(['admin', 'tecnico']), //to update via the id
    requestController.updateTecnicoResponsavel);

// Remoção de um pedido de diagnóstico existente
requestrouter.delete('/:id', authorization(['admin']),requestController.deletePedido);

module.exports = requestrouter;