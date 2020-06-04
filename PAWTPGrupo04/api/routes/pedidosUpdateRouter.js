const express = require('express');

const multerUpload = require('../../config/multer.config')

const updateRequestController = require('../controllers/UpdatePedidoController')
const requestUpdateRouter = express.Router();

// ## Este método permitiria atualizar os dados de um pedido, no entanto foi substituido pela abordagem à frente ## Deprecated
// ## requestUpdateRouter.put('/:id',  authorization(['admin']), requestController.updatePedido);

// Atualização do estado de um pedido de diagnóstico
requestUpdateRouter.put('/firstDate/:id', updateRequestController.updateDataPrimeiroTeste);

requestUpdateRouter.put('/firstTest/:id', updateRequestController.updateResultadoPrimeiroTeste);

requestUpdateRouter.put('/secondDate/:id', updateRequestController.updateDataSegundoTeste);

requestUpdateRouter.put('/secondTest/:id', updateRequestController.updateResultadoSegundoTeste);

// Atualização do técnico responsável pelo pedido de diagnóstico
requestUpdateRouter.put('/worker/:id', updateRequestController.updateTecnicoResponsavel);

// Upload do ficheiro de resultados e atualização do filepath no Model respetivo
requestUpdateRouter.post('/upload/:id', multerUpload.single('file'),
        updateRequestController.uploadDiagnoseResultsFile);

module.exports = requestUpdateRouter;