var express = require('express');
var requestrouter = express.Router();

const requestController = require('../controllers/PedidoController')

requestrouter.post('/request/', requestController.fillPedido);

module.exports = requestrouter;