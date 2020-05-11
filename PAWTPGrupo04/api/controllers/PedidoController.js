const Pedido = require('../models/pedido')

const fillPedido = async (req, res) => {
	const requestData = req.body
	const result = await new Pedido(requestData).save()
	res.send(result)
}

const getAllPedidos = async (req, res) => {
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

const getUserPedido = async (req, res) => {
	const request = await Pedido.find({ CCutente: req.params.id })
	res.send(request)
}

//Qualquer update básico funciona neste método. Podemos modificar partes do body consoante certas condições. O objetivo principal aqui é alterar os resultados e fechar o caso.
const updatePedido = async (req, res) => {
	try {
		const outdadRequest = await Pedido.findByIdAndUpdate(
			req.params.id,
			req.body)
		const updatedRequest = await Pedido.findById(req.params.id)
		res.send({
			old: outdadRequest,
			new: updatedRequest
		})
	} catch (e) {
		console.log(e)
		res.status(404)
		res.send(null)
	}
}

const updateTestInfo = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id);
	
	if (pedido.casoFechado === false) {
		try {
			if (req.body.dataInicial != null) { //Quando for necessário marcar uma data para o primeiro exame
				await Pedido.findByIdAndUpdate(req.params.id, { dataInicial: req.body.dataInicial })
			}
			if (req.body.resultadoInicial != null) { //Verifica se tem um resultado para o primeiro teste
				if (req.body.resultadoInicial === false  && req.body.dataFinal != null) { //Verifica se há necessidade de segundo teste e data para a sua marcação
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoInicial: req.body.resultadoInicial, dataFinal: req.body.dataFinal})
				} else { //caso seja positivo, dá-se como fechado					
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoInicial: req.body.resultadoInicial, casoFechado: true, infetado:true})
				}
			}
			if (req.body.resultadoFinal != null) { // Verifica se existe resultado final
				if(req.body.resultadoFinal === false){
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoFinal: req.body.resultadoFinal, casoFechado: true, infetado: false})
				}else{
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoFinal: req.body.resultadoFinal, casoFechado: true, infetado:true}) //por motivo desconhecido, não atualiza infetado
				}
			}
			const updatedPedido = await Pedido.findById(req.params.id);
			res.send({
				old: pedido,
				new: updatedPedido
			})

		} catch (e) {
			console.log(e)
			res.status(404)
			res.send(null)
		}
	}
}

const updateTecnicoResponsavel = async (req, res) => {
	//lógicas de negócio aqui
	if (tecnicoResponsavel !== null) {
		try {
			const outdadRequest = await Pedido.findByIdAndUpdate(
				req.params.id,
				{ tecnicoResponsavel: req.body.tecnicoResponsavel})
			const updatedRequest = await Pedido.findById(req.params.id)
			res.send({
				old: outdadRequest,
				new: updatedRequest
			})
		} catch (e) {
			console.log(e)
			res.status(404)
			res.send(null)
		}
	}
}

const deletePedido = async (req, res) => {
	try {
		const outdadRequest = await Pedido.findByIdAndUpdate(
			req.params.id,
			{ deleted: true })
		const updatedRequest = await Pedido.findById(req.params.id)
		res.send({
			old: outdadRequest,
			new: updatedRequest
		})
	} catch (e) {
		console.log(e)
		res.status(404)
		res.send(null)
	}
}

const getSaude24Pedidos = async (req, res) => {
	const request = await Pedido.find({ encaminhado_saude24: true })
	res.send(request)
}

const getGrupoRiscoPedidos = async (req, res) => {
	const request = await Pedido.find({ grupoDeRisco: true })
	res.send(request)
}

const getTrabalhadoresRisco = async (req, res) => {
	const request = await Pedido.find({ trabalhadorDeRisco: true })
	res.send(request)
}

const getInfetados = async (req, res) => {
	const request = await Pedido.find({ infetado: true })
	res.send(request)
}

const getCasosAbertos = async (req, res) => {
	const request = await Pedido.find({ casofechado: false })
	res.send(request)
}

const getPositivos = async (req, res) => {
	const request = await Pedido.find({ casoFechado: true, resultadoInicial: true, resultadoFinal: true })
	res.send(request)
}

const getNegativos = async (req, res) => {
	const request = await Pedido.find({ $or: [{ casoFechado: true, resultadoInicial: false }, { casoFechado: true, resultadoInicial: true, resultadoFinal: false }] })
	res.send(request)
}

module.exports = {
	fillPedido,
	getAllPedidos,
	getPedidobyID,
	updatePedido,
	getUserPedido,
	deletePedido,
	getSaude24Pedidos,
	getGrupoRiscoPedidos,
	getTrabalhadoresRisco,
	getInfetados,
	getCasosAbertos,
	getPositivos,
	getNegativos,
	updateTecnicoResponsavel,
	updateTestInfo
}