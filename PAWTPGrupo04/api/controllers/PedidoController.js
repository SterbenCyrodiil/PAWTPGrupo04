const Pedido = require('../models/pedido')

const fillPedido = async (req, res) => {
	try {
		console.log("BODY DATA", req.body);
		// ## Guardar só informação correta, uma vez que pode chegar qualquer coisa pelo body
		const requestData = {
			idRequest: req.body.id, CCutente: req.body.CCutente,
			trabalhadorDeRisco: req.body.trabalhadorDeRisco,
			grupoDeRisco: req.body.grupoDeRisco,
			encaminhado_saude24: req.body.encaminhado_saude24
		}
		const result = await new Pedido(requestData).save();
		console.log("SAVED DATA", result);
		// ## Enviar de volta só informação relevante, evitando reenviar informação sensível ou irrelevante
		const request = {
			idRequest: result.idRequest, CCutente: result.CCutente,
			trabalhadorDeRisco: result.trabalhadorDeRisco,
			grupoDeRisco: result.grupoDeRisco,
			encaminhado_saude24: result.encaminhado_saude24
		}
		res.status(200).json({success: true, data: request}); 
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			res.json({success: false, msg: 'O pedido já se encontra registado!'});
		} else {
			res.json({success: false, msg: 'Dados em falta, incorretos!'});
		}
	}
}

const deletePedido = async (req, res) => {
	try {
		let oldRequestInfo = await Pedido.findById(req.params.id);

		if (!oldRequestInfo) {
			res.status(404).send("Request could not be found")
		}
		else if (oldRequestInfo.deleted === true) {
			res.status(404).send('Pedido já foi eliminado!');
		} else {
			oldRequestInfo = await Pedido.findByIdAndUpdate(
				req.params.id, { deleted: true })
			res.status(200).send({
				old: oldRequestInfo
			})
		}
	} catch (e) {
		if (e.name === 'CastError') {
			res.status(404).send("Request could not be found")
		} else {
			console.error(e)
			res.status(500).send(null)
		}
	}
}

const getAllPedidos = async (req, res) => {
	const request = await Pedido.find();
	res.status(200).send(request);
}

const getPedidobyID = async (req, res) => {
	try {
		const request = await Pedido.findById(req.params.id)
		
		if (request) 
			res.status(200).send(request)
		else
			res.status(404).send("Request could not be found")
	} catch (e) {
		if (e.name === 'CastError') {
			res.status(404).send("Request could not be found")
		} else {
			console.error(e)
			res.status(500).send(null)
		}
	}
}

const getUserPedido = async (req, res) => {
	// ## Só será possível retornar a informação se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
	if (req.user_data.role !== 'admin' && req.params.id !== req.user_data.CC) {
		res.status(403).send('Necessário ter a sessão iniciada deste utilizador para retornar os dados');
	} else {
		try {
			const request = await Pedido.findOne({ CCutente: req.params.id })

			if (request) 
				res.status(200).send(request)
			else
				res.status(404).send("Request could not be found")
		} catch (e) {
			console.error(e)
			res.status(500).send(null)
		}
	}
}

const getSaude24Pedidos = async (req, res) => {
	const request = await Pedido.find({ encaminhado_saude24: true })
	res.status(200).send(request)
}

const getGrupoRiscoPedidos = async (req, res) => {
	const request = await Pedido.find({ grupoDeRisco: true })
	res.status(200).send(request)
}

const getTrabalhadoresRisco = async (req, res) => {
	const request = await Pedido.find({ trabalhadorDeRisco: true })
	res.status(200).send(request)
}

const getInfetados = async (req, res) => {
	const request = await Pedido.find({ infetado: true })
	res.status(200).send(request)
}

const getCasosAbertos = async (req, res) => {
	const request = await Pedido.find({ casofechado: false })
	res.status(200).send(request)
}

const getPositivos = async (req, res) => {
	const request = await Pedido.find({ casoFechado: true, infetado: true })
	res.status(200).send(request)
}

const getNegativos = async (req, res) => {
	//({ $or: [{ casoFechado: true, resultadoInicial: false }, { casoFechado: true, resultadoInicial: true, resultadoFinal: false }] })
	const request = await Pedido.find({ casoFechado: true, infetado: false })
	res.status(200).send(request)
}

const countPerDay = async (req, res) => {
	const request = await Pedido.countDocuments({ $or: [{ dataInicial: req.body.id }, { dataFinal: req.body.id }] })
	res.status(200).send(request)
}

const downloadResultsFile = async (req, res) => {
	try {
		const requestInfo = await Pedido.findById( req.params.id );

		if (!requestInfo) {
			res.status(404).send('Pedido de diagnóstico não existe')
		}
		else if (requestInfo.casoFechado === false) {
			res.status(404).send('Pedido de diagnóstico ainda não foi concluido')
		} 
		else {
			const filePath = requestInfo.filepath,
					downloadName = `Resultado_Diagnostico_${ requestInfo.idRequest }.pdf`;
			
			res.download(filePath, downloadName);
		}

	} catch (e) {
		console.log(e)
		res.send(null)
	}
}

module.exports = {
	fillPedido,
	getAllPedidos,
	getPedidobyID,
	getUserPedido,
	deletePedido,
	getSaude24Pedidos,
	getGrupoRiscoPedidos,
	getTrabalhadoresRisco,
	getInfetados,
	getCasosAbertos,
	getPositivos,
	getNegativos,
	countPerDay,
	downloadResultsFile
}