const express = require('express');

const requestController = require('../controllers/pedidoController')
const requestrouter = express.Router();

requestrouter.get('/', requestController.getAllPedidos);
requestrouter.get('/saude24', requestController.getSaude24Pedidos);
requestrouter.get('/gruposrisco', requestController.getGrupoRiscoPedidos);
requestrouter.get('/trabalhadores', requestController.getTrabalhadoresRisco);
requestrouter.get('/infetados', requestController.getInfetados);
requestrouter.get('/testespositivos', requestController.getPositivos);
requestrouter.get('/testesnegativos', requestController.getNegativos);
requestrouter.get('/countDay/:id', requestController.countPerDay);

requestrouter.post('/', requestController.fillPedido);

requestrouter.get('/user/:id', requestController.getUserPedido); //ID == CCutente
requestrouter.get('/:id', requestController.getPedidobyID);


requestrouter.put('/:id',  //to update everything possible without verifications via the id
    requestController.updatePedido);

requestrouter.put('/update/firstDate/:id',
    requestController.updateDataPrimeiroTeste);
requestrouter.put('/update/firstTest/:id',
    requestController.updateResultadoPrimeiroTeste);
requestrouter.put('/update/secondTest/:id',
    requestController.updateResultadoSegundoTeste);

requestrouter.put('/update/worker/:id',  //to update via the id
    requestController.updateTecnicoResponsavel);

requestrouter.delete('/:id', requestController.deletePedido);

module.exports = requestrouter;