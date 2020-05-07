var express = require('express');
var requestrouter = express.Router();

const requestController = require('../controllers/PedidoController')

requestrouter.get('/', requestController.getAllPedidos);

requestrouter.post('/', requestController.fillPedido);

requestrouter.get('/:id',requestController.getPedidobyID); 

requestrouter.put('/:id',  //to update via the id
    requestController.updatePedido); 

//Só criar, buscar e atualizar. Nunca se apagam os registos, por isso, manter.

module.exports = requestrouter;