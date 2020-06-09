const express = require('express');

const multerUpload = require('../../config/multer.config')

const updateRequestController = require('../controllers/UpdatePedidoController')
const requestUpdateRouter = express.Router();

/**
 * @swagger
 * /requests/update/firstDate/{id}:
 *   put:
 *     summary: Updates the first test date of a specific Request
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: requestInfo
 *         description: Information to update the Request.
 *         schema:
 *           type: object
 *           properties:
 *             testDate:
 *               required: true
 *               description: Date information for the Test (yyyy-mm-dd)
 *               type: string
 *               format: date
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.put('/firstDate/:id', updateRequestController.updateDataPrimeiroTeste);

/**
 * @swagger
 * /requests/update/firstTest/{id}:
 *   put:
 *     summary: Updates the first Test result of a Request
 *     description: A second Test may be scheduled if the result is 'false'. In this case the second Test date is mandatory. Otherwise, diagnosis is finished
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: requestInfo
 *         description: Information to update the Request. 'SecondTestDate' needed only if 'testResult' is false!
 *         schema:
 *           type: object
 *           properties:
 *             testResult:
 *               required: true
 *               description: Result information about the Test
 *               type: boolean
 *             secondTestDate:
 *               description: Date information for the Test (yyyy-mm-dd)
 *               type: string
 *               format: date
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.put('/firstTest/:id', updateRequestController.updateResultadoPrimeiroTeste);

/**
 * @swagger
 * /requests/update/secondDate/{id}:
 *   put:
 *     summary: Updates the second Test date of a specific Request
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: requestInfo
 *         description: Information to update the Request.
 *         schema:
 *           type: object
 *           properties:
 *             testDate:
 *               required: true
 *               description: Date information for the Test (yyyy-mm-dd)
 *               type: string
 *               format: date
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.put('/secondDate/:id', updateRequestController.updateDataSegundoTeste);

/**
 * @swagger
 * /requests/update/secondTest/{id}:
 *   put:
 *     summary: Updates the second Test result of a Request
 *     description: After this Test the diagnosis if finished. A new Request needs to be made if more Tests are needed
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: requestInfo
 *         description: Information to update the Request.
 *         schema:
 *           type: object
 *           properties:
 *             testResult:
 *               required: true
 *               description: Result information about the Test
 *               type: boolean
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.put('/secondTest/:id', updateRequestController.updateResultadoSegundoTeste);

/**
 * @swagger
 * /requests/update/tecnico/{id}:
 *   put:
 *     summary: Updates the Worker ('tecnico') who's in charge of this Request
 *     tags: [Pedidos]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: body
 *         name: requestInfo
 *         description: Identification of the Worker responsible for the Request.
 *         schema:
 *           type: object
 *           properties:
 *             tecnico:
 *               required: true
 *               type: string
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.put('/tecnico/:id', updateRequestController.updateTecnicoResponsavel);

/**
 * @swagger
 * /requests/update/upload/{id}:
 *   post:
 *     summary: Uploads the file with this Request results
 *     tags: [Pedidos]
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idPath'
 *       - in: formData
 *         name: requestInfo
 *         description: The results PDF file finishing the Request
 *         type: file
 *         required: true
 *     responses:
 *       200: 
 *         $ref: '#/responses/PedidoUpdate'
 *       400:
 *         $ref: '#/responses/ErrorMessage'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
requestUpdateRouter.post('/upload/:id', multerUpload.single('file'),
        updateRequestController.uploadDiagnoseResultsFile);

// ## Este método permitiria atualizar os dados de um pedido, no entanto foi substituido pela abordagem à frente ## Deprecated
// ## requestUpdateRouter.put('/:id',  authorization(['admin']), requestController.updatePedido);

module.exports = requestUpdateRouter;