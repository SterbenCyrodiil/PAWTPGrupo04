var express = require('express');
var requestrouter = express.Router();

const requestController = require('../controllers/PedidoController')

requestrouter.get('/', function(req, res){
    res.send('REQUEST GET')
});

requestrouter.post('/', function(req, res){
    requestController.fillPedido
});

requestrouter.get('/:id', function(req, res){ //search for one in specific

}); 

requestrouter.put('/:id', function(req, res){  //to update via the id
    requestController.updatePedido
}); 

//Só criar, buscar e atualizar. Nunca se apagam os registos, por isso, manter.

module.exports = requestrouter;