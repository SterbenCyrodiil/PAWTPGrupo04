const express = require('express');

const authorization = require('../middleware/authorization')
const requestController = require('../controllers/pedidoController')
const requestrouter = express.Router();

requestrouter.get('/', authorization(['admin', 'tecnico']), requestController.getAllPedidos);
requestrouter.get('/saude24', authorization(['admin', 'tecnico']), requestController.getSaude24Pedidos);
requestrouter.get('/gruposrisco', authorization(['admin', 'tecnico']), requestController.getGrupoRiscoPedidos);
requestrouter.get('/trabalhadores', authorization(['admin', 'tecnico']), requestController.getTrabalhadoresRisco);
requestrouter.get('/infetados', authorization(['admin', 'tecnico']), requestController.getInfetados);
requestrouter.get('/testespositivos', authorization(['admin', 'tecnico']), requestController.getPositivos);
requestrouter.get('/testesnegativos', authorization(['admin', 'tecnico']), requestController.getNegativos);
requestrouter.get('/countDay/:id', authorization(['admin', 'tecnico']), requestController.countPerDay);

requestrouter.post('/', authorization(['utente']),requestController.fillPedido);

requestrouter.get('/user/:id', authorization(['admin', 'tecnico', 'utente']), requestController.getUserPedido); //ID == CCutente
requestrouter.get('/:id', authorization(['admin', 'tecnico']), requestController.getPedidobyID);


requestrouter.put('/:id',  authorization(['admin', 'tecnico']), //to update everything possible without verifications via the id
    requestController.updatePedido);

requestrouter.put('/update/firstDate/:id', authorization(['admin', 'tecnico']),
    requestController.updateDataPrimeiroTeste);
requestrouter.put('/update/firstTest/:id', authorization(['admin', 'tecnico']),
    requestController.updateResultadoPrimeiroTeste);
requestrouter.put('/update/secondTest/:id', authorization(['admin', 'tecnico']),
    requestController.updateResultadoSegundoTeste);

requestrouter.put('/update/worker/:id',  authorization(['admin', 'tecnico']), //to update via the id
    requestController.updateTecnicoResponsavel);

requestrouter.delete('/:id', authorization(['admin']),requestController.deletePedido);

module.exports = requestrouter;