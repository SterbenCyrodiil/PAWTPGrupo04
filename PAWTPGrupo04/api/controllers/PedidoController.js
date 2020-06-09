const Pedido = require('../models/pedido')

const fillPedido = async (req, res, next) => {
	console.log("BODY DATA", req.body);
	// ## Guardar informação do body
	const requestData = {
		idRequest: req.body.id, CCutente: req.body.CCutente,
		trabalhadorDeRisco: req.body.trabalhadorDeRisco,
		grupoDeRisco: req.body.grupoDeRisco,
		encaminhado_saude24: req.body.encaminhado_saude24
	}
	const result = await new Pedido(requestData).save().catch(next);

	if (result) {
		console.log("SAVED DATA", result);
		res.json({
			data: result
		});
	} else {
		next({
			message: 'Pedido de diagnóstico não existe',
			status: 404
		})
	} 
}

const deletePedido = async (req, res, next) => {
	let requestInfo = await Pedido.findById(req.params.id, '+deleted').catch(next);

	if (!requestInfo) {
		next({
			message: 'Pedido de diagnóstico não existe',
			status: 404
		})
	}
	else if (requestInfo.deleted === true) {
		next({
			message: 'Pedido já foi eliminado!',
			status: 404
		})
	} else {
		requestInfo = await Pedido.findByIdAndUpdate(req.params.id, { deleted: true }).catch(next);
		res.json({
			old: requestInfo
		})
	}
}

const getAllPedidos = async (req, res, next) => {
	const request = await Pedido.find({}).catch(next);
	res.json(request);
}

const getTecnicoPedidos = async (req, res, next) => {
	const request = await Pedido.find({ tecnicoResponsavel: req.params.id }).catch(next);

	if (request && request.length > 0) {
		res.json(request)
	} else {
		next({
			message: 'Não foram encontrados pedidos de diagnóstico :(',
			status: 404
		})
	}
}

const getOpenPedidos = async (req, res, next) => {
	const request = await Pedido.find({ casoFechado: false, tecnicoResponsavel: { $exists: false }}).catch(next);
	res.json(request);
}

const getPedidobyID = async (req, res, next) => {
	const request = await Pedido.findById(req.params.id).catch(next);
	
	if (request) {
		res.json(request)
	} else {
		next({
			message: 'Pedido de diagnóstico não existe',
			status: 404
		})
	}
}

const getUserPedidos = async (req, res, next) => {
	// ## Só será possível retornar a informação se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
	if (req.session.role !== 'ADMIN' && req.params.id !== req.session.CC) {
		next({
			message: 'Permissões adicionais em falta.',
			status: 403
		})
	} else {
		const request = await Pedido.find({ CCutente: req.params.id }).catch(next);

		if (typeof request !== 'undefined' && request.length > 0) {
			res.json(request)
		} else {
			next({
				message: 'Não foram encontrados pedidos de diagnóstico :(',
				status: 404
			})
		}
	}
}

const getUserPedido = async (req, res, next) => {
	// ## Só será possível retornar a informação se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
	if (req.session.role !== 'ADMIN' && req.params.id !== req.session.CC) {
		next({
			message: 'Permissões adicionais em falta.',
			status: 403
		})
	} else {
		const request = await Pedido
			.find({ CCutente: req.params.id }).sort({ updated_at: -1}).limit(1)
			.catch(next);

		if (request) {
			res.json(request)
		} else {
			next({
				message: 'Não foram encontrados pedidos de diagnóstico :(',
				status: 404
			})
		}
	}
}

const getSaude24Pedidos = async (req, res, next) => {
	const request = await Pedido.find({ encaminhado_saude24: true }).catch(next);
	res.json(request);
}

const getGrupoRiscoPedidos = async (req, res, next) => {
	const request = await Pedido.find({ grupoDeRisco: true }).catch(next);
	res.json(request);
}

const getTrabalhadoresRisco = async (req, res, next) => {
	const request = await Pedido.find({ trabalhadorDeRisco: true }).catch(next);
	res.json(request);
}

const getInfetados = async (req, res, next) => {
	const request = await Pedido.find({ infetado: true }).catch(next);
	res.json(request);
}

const getCasosAbertos = async (req, res, next) => {
	const request = await Pedido.find({ casofechado: false }).catch(next);
	res.json(request);
}

const getPositivos = async (req, res, next) => {
	const request = await Pedido.find({ casoFechado: true, infetado: true }).catch(next);
	res.json(request);
}

const getNegativos = async (req, res, next) => {
	//({ $or: [{ casoFechado: true, resultadoInicial: false }, { casoFechado: true, resultadoInicial: true, resultadoFinal: false }] })
	const request = await Pedido.find({ casoFechado: true, infetado: false }).catch(next);
	res.json(request);
}

const countPerDay = async (req, res, next) => {
	const request = await Pedido.countDocuments({ $or: [{ dataInicial: req.body.id }, { dataFinal: req.body.id }] }).catch(next);
	res.json({ countPerDay: request });
}

const downloadResultsFile = async (req, res, next) => {
	const requestInfo = await Pedido.findById( req.params.id ).catch(next);

	if (!requestInfo) {
		next({
			message: 'Pedido de diagnóstico não existe',
			status: 404
		})
	}
	else if (requestInfo.casoFechado === false) {
		next({
			message: 'Pedido de diagnóstico ainda não foi concluido',
			status: 404
		})
	} 
	else {
		const filePath = requestInfo.filepath,
				downloadName = `Resultado_Diagnostico_${ requestInfo.idRequest }.pdf`;
		
		res.download(filePath, downloadName);
	}
}

module.exports = {
	fillPedido,
	getAllPedidos,
	getTecnicoPedidos,
	getOpenPedidos,
	getPedidobyID,
	getUserPedidos,
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