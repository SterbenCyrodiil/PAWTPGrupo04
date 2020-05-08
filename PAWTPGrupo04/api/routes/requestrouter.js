var express = require('express');
var requestrouter = express.Router();

const requestController = require('../controllers/PedidoController')

requestrouter.get('/', requestController.getAllPedidos);

requestrouter.post('/', requestController.fillPedido);

// requestrouter.get('/:CCutente', requestController.getUserPedido); 

requestrouter.get('/:id',requestController.getPedidobyID); 

requestrouter.put('/:id',  //to update via the id
    requestController.updatePedido); 

requestrouter.delete('/:id', requestController.deletePedido);

module.exports = requestrouter;