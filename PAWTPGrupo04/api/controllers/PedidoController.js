const Pedido = require('../models/pedido')

const fillPedido = async (req, res) => {
	const requestData = req.body
	const result = await new Pedido(requestData).save()
	res.send(result)
}

const getPedidobyID = async (req, res) => {
	try {
		const request = await Pedido.findById(req.params.id)
			.catch((e) => {
				return null
			})
		res.send(product)
	} catch (e) {
		console.error(e)
		res.status(404)
		res.send(null)
	}

}

const updatePedido = async (req, res) => {
	const outdadRequest = await Pedido.findByIdAndUpdate(
		req.params.id,
		req.body)
	const updatedRequest = await Pedido.findById(req.params.id)
	res.send({
		old:outdadRequest,
		new:updatedRequest
	})
}

module.export = {
	fillPedido,
	updatePedido
}