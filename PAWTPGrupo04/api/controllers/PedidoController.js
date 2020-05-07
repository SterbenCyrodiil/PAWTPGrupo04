const Pedido = require('../models/pedido')

const fillPedido = async (req, res) => {
	const requestData = req.body
	const result = await new Pedido(requestData).save()
	res.send(result)
}

const getAllPedidos = async (req, res) =>{
	const request = await Pedido.find();
	res.send(request);
}

const getPedidobyID = async (req, res) => {
	try {
		const request = await Pedido.findById(req.params.id)
			.catch((e) => {
				return null
			})
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(404)
		res.send(null)
	}

}

const updatePedido = async (req, res) => {
	try{const outdadRequest = await Pedido.findByIdAndUpdate(
		req.params.id,
		req.body)
	const updatedRequest = await Pedido.findById(req.params.id)
	res.send({
		old:outdadRequest,
		new:updatedRequest
	})
	} catch (e){
		console.log(e)
		res.status(404)
		res.send(null)
	}
}

module.exports = {
	fillPedido,
	getAllPedidos,
	getPedidobyID,
	updatePedido
}