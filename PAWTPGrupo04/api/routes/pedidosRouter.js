const express = require('express');

const authorization = require('../middleware/authorization')
const multerUpload = require('../../config/multer.config')

const updateRequestController = require('../controllers/UpdatePedidoController')
const requestController = require('../controllers/PedidoController')
const requestRouter = express.Router();

// Listagens de Pedidos
requestRouter.get('/', authorization(['admin', 'tecnico']), requestController.getAllPedidos);
/* Listagem por Informação Prioritária */
requestRouter.get('/saude24', authorization(['admin', 'tecnico']), requestController.getSaude24Pedidos);
requestRouter.get('/gruposrisco', authorization(['admin', 'tecnico']), requestController.getGrupoRiscoPedidos);
requestRouter.get('/trabalhadores', authorization(['admin', 'tecnico']), requestController.getTrabalhadoresRisco);
/* Listagem por Resultados de Diagnóstico */
requestRouter.get('/infetados', authorization(['admin', 'tecnico']), requestController.getInfetados);
requestRouter.get('/testespositivos', authorization(['admin', 'tecnico']), requestController.getPositivos);
requestRouter.get('/testesnegativos', authorization(['admin', 'tecnico']), requestController.getNegativos);
requestRouter.get('/countDay/:id', authorization(['admin', 'tecnico']), requestController.countPerDay);
/* Listagem por Pedido único */
requestRouter.get('/:id', authorization(['admin', 'tecnico']), requestController.getPedidobyID);
// ## Só será possível retornar a informação desta rota se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
requestRouter.get('/user/:id', authorization(['admin', 'tecnico', 'utente']), requestController.getUserPedido);


// TODO
// Adicionar Swagger, params request :id para o download
// Qualquer administrador ou técnico pode aceder ao ficheiro de resultados de um pedido
// Download do ficheiro de resultados do diagnóstico
requestRouter.get('/download/:id', authorization(['admin', 'tecnico']), requestController.downloadResultsFile);


// Registo de novos pedidos de diagnóstico
requestRouter.post('/', authorization(['utente']),requestController.fillPedido);
// Remoção de um pedido de diagnóstico existente
requestRouter.delete('/:id', authorization(['admin']),requestController.deletePedido);

// ## Este método permitiria atualizar os dados de um pedido, no entanto foi substituido pela abordagem à frente ## Deprecated
// ## requestRouter.put('/:id',  authorization(['admin']), requestController.updatePedido);

// Atualização do estado de um pedido de diagnóstico
requestRouter.put('/update/firstDate/:id', authorization(['admin', 'tecnico']),
        updateRequestController.updateDataPrimeiroTeste);

requestRouter.put('/update/firstTest/:id', authorization(['admin', 'tecnico']),
        updateRequestController.updateResultadoPrimeiroTeste);

requestRouter.put('/update/secondDate/:id', authorization(['admin', 'tecnico']),
        updateRequestController.updateDataSegundoTeste);

requestRouter.put('/update/secondTest/:id', authorization(['admin', 'tecnico']),
        updateRequestController.updateResultadoSegundoTeste);

// Atualização do técnico responsável pelo pedido de diagnóstico
requestRouter.put('/update/worker/:id',  authorization(['admin', 'tecnico']),
        updateRequestController.updateTecnicoResponsavel);

// Upload do ficheiro de resultados e atualização do filepath no Model respetivo
requestRouter.post('/update/upload/:id', authorization(['admin', 'tecnico']), multerUpload.single('file'),
        updateRequestController.uploadDiagnoseResultsFile);

module.exports = requestRouter;