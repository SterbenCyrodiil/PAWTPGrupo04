var express = require('express');
var requestrouter = express.Router();

const requestController = require('../controllers/PedidoController')

requestrouter.get('/', requestController.getAllPedidos);
requestrouter.get('/saude24', requestController.getSaude24Pedidos);
requestrouter.get('/gruposrisco', requestController.getGrupoRiscoPedidos);
requestrouter.get('/trabalhadores', requestController.getTrabalhadoresRisco);
requestrouter.get('/infetados', requestController.getInfetados);
requestrouter.get('/testespositivos', requestController.getPositivos);
requestrouter.get('/testesnegativos', requestController.getNegativos);

requestrouter.post('/', requestController.fillPedido);

requestrouter.get('/user/:id', requestController.getUserPedido); //ID == CCutente
requestrouter.get('/:id', requestController.getPedidobyID);


requestrouter.put('/:id',  //to update everything possible without verifications via the id
    requestController.updatePedido);

requestrouter.put('/testinfo/:id',  //to update via the id
    requestController.updateTestInfo);

requestrouter.put('/requestResponsible/:id',  //to update via the id
    requestController.updateTecnicoResponsavel);

requestrouter.delete('/:id', requestController.deletePedido);

module.exports = requestrouter;