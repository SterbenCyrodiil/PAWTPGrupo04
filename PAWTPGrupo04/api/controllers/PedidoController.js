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

const getAllPedidos = async (req, res) => {
	const request = await Pedido.find();
	res.status(200).send(request);
}

const getPedidobyID = async (req, res) => {
	try {
		const request = await Pedido.findById(req.params.id)
			.catch((e) => {
				return null
			})
		res.status(200).send(request)
	} catch (e) {
		console.error(e)
		res.send(null)
	}
}

const getUserPedido = async (req, res) => {
	// ## Só será possível retornar a informação se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
	if (req.user_data !== 'admin' && req.params.id !== req.user_data.CC) {
		res.status(403).send('Necessário ter a sessão iniciada deste utilizador para retornar os dados');
	} else {
		try {
			const request = await Pedido.find({ CCutente: req.params.id })
			res.status(200).send(request)
		} catch (e) {
			console.log(err)
			res.send(null)
		}
	}
}

// ## Este método permitiria atualizar os dados de um pedido, no entanto foi substituido ## Deprecated
// const updatePedido = async (req, res) => {
// 	try {
// 		const outdadRequest = await Pedido.findByIdAndUpdate(
// 			req.params.id,
// 			req.body)
// 		const updatedRequest = await Pedido.findById(req.params.id)
// 		res.send({
// 			old: outdadRequest,
// 			new: updatedRequest
// 		})
// 	} catch (e) {
// 		console.log(e)
// 		res.status(404)
// 		res.send(null)
// 	}
// }

const updateDataPrimeiroTeste = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
	}
	else if (!req.body.dataInicial) {
		res.status(400).send('Bad Request. Dados sobre a data do teste em falta!')
	}
	else {
		try {
			// ## Marcar a data do primeiro teste # Será o primeiro update para o diagnostico
			if (pedido.dataInicial == null) { // Atualizar a data inicial só se ainda não existem resultados do primeiro teste
				await Pedido.findByIdAndUpdate(req.params.id, { dataInicial: req.body.dataInicial });

				const updatedPedido = await Pedido.findById(req.params.id);
				res.status(200).send({
					old: pedido,
					new: updatedPedido
				});
			} else {
				console.log(pedido.dataInicial)
				res.status(404).send('O primeiro teste já foi realizado!');
			}

		} catch (e) {
			console.log(e);
			res.send(null);
		}
	}
}

const updateResultadoPrimeiroTeste = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
	console.log(req.body.resultadoInicial, "\n", typeof req.body.resultadoInicial)

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
	}
	else if (req.body.resultadoInicial != null) { //Vai ser necessário modificar estes ifs. Não irá ser dificil, mas trabalhoso
		try {
			if (pedido.dataInicial != null) { // Atualizar o resultado do primeiro teste só se existir a data indicada 
				if (req.body.resultadoInicial === 'false' && req.body.dataFinal != null) { // Marcar a data para o segundo teste (48 horas de diferença) se o primeiro teste der negativo
					if (((new Date (req.body.dataFinal).getTime() - pedido.dataInicial.getTime()) / 3600000) >= 48) {
						await Pedido.findByIdAndUpdate(req.params.id, { resultadoInicial: req.body.resultadoInicial, dataFinal: req.body.dataFinal });
						const updatedPedido = await Pedido.findById(req.params.id);
						res.status(200).send({
							old: pedido,
							new: updatedPedido
						});
					} else {
						res.status(404).send('O teste não foi agendado! A diferença de datas não deverá ser superior a 48 horas!')
					}
				} else if (req.body.resultadoInicial === 'true') { // caso o primeiro teste seja positivo, dá-se o diagnóstico como fechado
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoInicial: req.body.resultadoInicial, casoFechado: true, infetado: true });
					const updatedPedido = await Pedido.findById(req.params.id);
					res.status(200).send({
						old: pedido,
						new: updatedPedido
					});
				} else {
					res.status(400).send('Bad Request. Dados sobre data do teste em falta!');
				}

			} else {
				res.status(404).send('O teste não foi agendado!');
			}
		} catch (e) {
			console.log(e);
			res.send(null);
		}
	}
	else {
		res.status(400).send('Bad Request. Dados sobre o resultado do teste em falta!')
	}

}

const updateSegundaData = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id);

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
	}
	else if (!req.body.dataFinal) {
		res.status(400).send('Bad Request. Dados sobre a data do teste em falta!')
	} else {
		if (pedido.dataInicial != null && pedido.dataFinal != null) {
			if (((new Date (req.body.dataFinal).getTime() - pedido.dataInicial.getTime()) / 3600000) >= 48) {
				await Pedido.findByIdAndUpdate(req.params.id, { dataFinal: req.body.dataFinal });
				const updatedPedido = await Pedido.findById(req.params.id);
					res.status(200).send({
						old: pedido,
						new: updatedPedido
					});
			} else {
				res.status(404).send('A diferença de datas não deverá ser superior a 48 horas!')
			}
		} else {
			res.status(404).send('Pedido de Diagnóstico não pode ser atualizado!')
		}
	}
}

const updateResultadoSegundoTeste = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
	}
	else if (!req.body.resultadoFinal) {
		res.status(400).send('Bad Request. Dados sobre o resultado do teste em falta!')
	}
	else {
		try {
			// ## Marcar o resultado do segundo teste # Será o possível terceiro update para o diagnostico
			if (pedido.dataFinal !== null) { // Atualizar o resultado do segundo teste só se existir a data indicada
				if (req.body.resultadoFinal === false) { // Marcar o caso como infetado ou não consoante o resultado do teste
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoFinal: req.body.resultadoFinal, casoFechado: true, infetado: false });
				} else {
					await Pedido.findByIdAndUpdate(req.params.id, { resultadoFinal: req.body.resultadoFinal, casoFechado: true, infetado: true });
				}

				const updatedPedido = await Pedido.findById(req.params.id);
				res.status(200).send({
					old: pedido,
					new: updatedPedido
				});
			}
			else {
				res.status(404).send('O teste não pôde ser agendado!');
			}

		} catch (e) {
			console.log(e);
			res.send(null);
		}
	}
}

const updateTecnicoResponsavel = async (req, res) => {
	if (req.body.tecnicoResponsavel !== null) {
		try {
			const outdadRequest = await Pedido.findByIdAndUpdate(
				req.params.id,
				{ tecnicoResponsavel: req.body.tecnicoResponsavel })
			const updatedRequest = await Pedido.findById(req.params.id)
			res.status(200).send({
				old: outdadRequest,
				new: updatedRequest
			})
		} catch (e) {
			console.log(e)
			res.send(null)
		}
	} else {
		res.status(400).send('Bad Request. Dados sobre o tecnico em falta!');
	}
}

const updateFilePath = async (req, res) => {
	const pedido = await Pedido.findById(req.params.id);

	if (pedido.casoFechado === false) {
		res.status(404).send('O diagnóstico ainda não foi concluído!');
	} else if (req.body.filepath) {
		try {
			const outdatedRequest = await Pedido.findByIdAndUpdate(
				req.params.id,
				{ filepath: req.body.filepath })
			const updatedRequest = await Pedido.findById(req.params.id)
			res.status(200).send({
				old: outdatedRequest,
				new: updatedRequest
			})
		} catch (e) {
			console.log(e)
			res.status(404).send(null);
		}
	} else {
		res.status(400).send('Bad Request. Dados sobre o ficheiro em falta!');
	}
}

const deletePedido = async (req, res) => {
	try {
		let oldRequestInfo = await Pedido.findById(req.params.id);

		if (oldRequestInfo.deleted === true) {
			res.status(404).send('Pedido já foi eliminado!');
		} else {
			oldRequestInfo = await Pedido.findByIdAndUpdate(
				req.params.id, { deleted: true })
			res.status(200).send({
				old: oldRequestInfo
			})
		}
	} catch (e) {
		console.log(e)
		res.send(null)
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

module.exports = {
	// updatePedido, ## Deprecated
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
	updateDataPrimeiroTeste,
	updateResultadoPrimeiroTeste,
	updateResultadoSegundoTeste,
	updateTecnicoResponsavel,
	countPerDay,
	updateSegundaData,
	updateFilePath
}