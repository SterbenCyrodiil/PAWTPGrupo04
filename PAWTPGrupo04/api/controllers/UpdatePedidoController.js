const fs = require('fs').promises;

const Pedido = require('../models/pedido')
const User = require('../models/user')

const updateDataPrimeiroTeste = async (req, res, next) => {
    const pedido = await Pedido.findById(req.params.id).catch(next);

	if (!pedido) {
		next({ message: 'Pedido de diagnóstico não existe', status: 404 })
	}
	else if (pedido.casoFechado === true) {
		next({ message: 'Pedido de diagnóstico já foi concluido', status: 404 })
    }
    else if (pedido.resultadoInicial != null) { // Data do teste é atualizada só se ainda não existem resultados do primeiro teste
        next({ message: 'Não foi possível atualizar a data. O teste já foi realizado.', status: 404 })
    }
    else if (!req.body.testDate) { // 'dataInicial' não está presente no body
        next({ message: 'Bad Request. Dados sobre a data do teste em falta!', status: 400 })
    } 
    else {
        // ## Marcar a data do primeiro teste # Será o primeiro update para o diagnostico
        const updatedPedido = await Pedido
            .findByIdAndUpdate(req.params.id, { dataInicial: req.body.testDate }, {new: true})
            .catch(next);
            
        res.json({
            msg: "Data atualizada com sucesso",
            old: pedido,
            new: updatedPedido
        });
	}
}

const updateResultadoPrimeiroTeste = async (req, res, next) => {
	const pedido = await Pedido.findById(req.params.id).catch(next);

	if (!pedido) {
		next({ message: 'Pedido de diagnóstico não existe', status: 404 })
	}
	else if (pedido.casoFechado === true) {
		next({ message: 'Pedido de diagnóstico já foi concluido', status: 404 })
    }
    else if (pedido.dataInicial == null) { // Resultado do teste só é atualizado se existir uma data marcada
        next({ message: 'Deverá ser agendada uma data para o teste antes de serem inseridos os resultados!', status: 404 })
    }
    else if (req.body.testResult == undefined) { // 'resultadoInicial' em falta no body
        next({ message: 'Bad Request! Resultado do teste em falta.', status: 400 })
    }
	else {
        if (req.body.testResult === false && req.body.secondTestDate) 
        { // Marcar a data para o segundo teste (48 horas de diferença) se o primeiro teste der negativo
            var resMsg = '', updatedPedido;
            if (((new Date (req.body.secondTestDate).getTime() - pedido.dataInicial.getTime()) / 3600000) <= 48) {
                updatedPedido = await Pedido
                    .findByIdAndUpdate(req.params.id, 
                        { resultadoInicial: req.body.testResult, dataFinal: req.body.secondTestDate }, {new: true})
                    .catch(next);
                resMsg = 'Resultado atualizado com sucesso. Data do próximo teste agendada';
                
            } else {
                updatedPedido = await Pedido
                    .findByIdAndUpdate(req.params.id, 
                        { resultadoInicial: req.body.testResult }, {new: true})
                    .catch(next);
                resMsg = 'Resultado atualizado com sucesso. Não foi possível agendar o segundo teste.' 
                        + 'A diferença de datas não deverá ser superior a 48 horas! Deverá reagendar uma nova data.'
            }

            await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'suspeito' }).catch(next);

            res.json({
                msg: resMsg,
                old: pedido,
                new: updatedPedido
            });
            
        } else if (req.body.testResult === true) 
        { // caso o primeiro teste seja positivo, dá-se o diagnóstico como fechado
            const updatedPedido = await Pedido
                .findByIdAndUpdate(req.params.id, 
                    { resultadoInicial: req.body.testResult, casoFechado: true, infetado: true}, {new: true})
                .catch(next);

            await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'infetado' }).catch(next);

            res.json({
                msg: 'Resultado atualizado com sucesso',
                old: pedido,
                new: updatedPedido
            });
            
        } else { // 'dataFinal' em falta no body
            next({ message: 'Bad Request! Data do segundo teste em falta.', status: 400 })
        }
	}
}

const updateDataSegundoTeste = async (req, res, next) => {
	const pedido = await Pedido.findById(req.params.id).catch(next);

	if (!pedido) {
		next({ message: 'Pedido de diagnóstico não existe', status: 404 })
	}
	else if (pedido.casoFechado === true) { 
		next({ message: 'Pedido de diagnóstico já foi concluido', status: 404 })
    }
    else if (pedido.resultadoInicial == null) {
        next({ message: 'Ainda não foi concluído um primeiro teste!', status: 404 })
    }
    else if (!req.body.testDate) { // 'dataFinal' não está presente no body
        next({ message: 'Bad Request. Dados sobre a data do teste em falta', status: 400 })
	} else {
        if (((new Date (req.body.testDate).getTime() - pedido.dataInicial.getTime()) / 3600000) <= 48) {

            const updatedPedido = await Pedido
                .findByIdAndUpdate(req.params.id, { dataFinal: req.body.testDate }, {new: true})
                .catch(next);

            res.json({
                msg: 'Data atualizada com sucesso',
                old: pedido,
                new: updatedPedido
            });
        } else {
            next({ message: 'A diferença de datas não deverá ser superior a 48 horas!', status: 404 })
        }
	}
}

const updateResultadoSegundoTeste = async (req, res, next) => {
	const pedido = await Pedido.findById(req.params.id).catch(next);

	if (!pedido) {
		next({ message: 'Pedido de diagnóstico não existe', status: 404 })
	}
	else if (pedido.casoFechado === true) {
        next({ message: 'Pedido de diagnóstico já foi concluido', status: 404 })
    }
    else if (pedido.dataFinal == null) { // Resultado do teste só é atualizado se existir uma data marcada
        next({ message: 'Deverá ser agendada uma data para o teste antes de serem inseridos os resultados!', status: 404 })
    }
    else if (req.body.testResult == undefined) { // 'resultadoFinal' não está presente no body
        next({ message: 'Bad Request. Dados sobre o resultado do teste em falta!', status: 400 })
	}
	else {
        // ## Marcar o resultado do segundo teste # Será o possível terceiro update para o diagnostico
        var updatedPedido;
        if (req.body.testResult === false) 
        { // Marcar o caso como infetado ou não consoante o resultado do teste
            updatedPedido = await Pedido
                .findByIdAndUpdate(req.params.id, 
                    { resultadoFinal: req.body.testResult, casoFechado: true, infetado: false}, {new: true})
                .catch(next);

            await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'regularizado' }).catch(next);

        } else {
            updatedPedido = await Pedido
                .findByIdAndUpdate(req.params.id, 
                    { resultadoFinal: req.body.testResult, casoFechado: true, infetado: true}, {new: true})
                .catch(next);
            
            await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'infetado' }).catch(next);
        }

        res.json({
            msg: 'Resultado atualizado com sucesso',
            old: pedido,
            new: updatedPedido
        });
	}
}

const updateTecnicoResponsavel = async (req, res, next) => {
    if (!req.body.tecnico) {
        next({
            message: 'Bad Request. Dados sobre o tecnico em falta!',
            status: 400
        })
    } else {
        const outdatRequest = await Pedido.findById(req.params.id).catch(next);

        if (outdatRequest) {
            const updatedRequest = await Pedido
                .findByIdAndUpdate(req.params.id, { tecnicoResponsavel: req.body.tecnico }, {new: true})
                .catch(next);

            res.status(200).send({
                msg: 'Tecnico responsável atualizado com sucesso',
                old: outdatRequest,
                new: updatedRequest
            })
        } else {
            next({
                message: 'Pedido de diagnóstico não existe',
                status: 404
            })
        }
    }
}

const uploadDiagnoseResultsFile = async (req, res, next) => {
    const pedido = await Pedido.findById(req.params.id).catch(next);

    if (!pedido) {
		next({
			message: 'Pedido de diagnóstico não existe',
			status: 404
		})
    }
    else if (pedido.casoFechado === false) {
        next({
			message: 'Pedido de diagnóstico ainda não foi concluido',
			status: 404
		})
    }
    else if (!req.file) { // verificar se o ficheiro de detalhes do resultado do diagnostico foi recebido
        next({
			message: 'Bad Request. Ficheiro PDF de detalhes do resultado não foi recebido!',
			status: 400
		})
    }
    else {
        const toFilePath = `./files/results/diagnose_results_${ pedido.idRequest }_${ Date.now() }.pdf`;

        // ler os dados do PDF temporario
        const tempFileData = await fs.readFile(req.file.path).catch(next);

        // escrever o conteúdo para o ficheiro a guardar
        await fs.writeFile(toFilePath, tempFileData).catch(next);
        req.resultsFile = toFilePath;

        try {
            const updatedPedido = await Pedido
                .findByIdAndUpdate(req.params.id, { filepath: toFilePath}, {new: true})

            res.status(200).send({
                msg: 'Ficheiro guardado com sucesso',
                old: pedido,
                new: updatedPedido
            });
            
            await fs.unlink(req.file.path); // remover o ficheiro temporario (opcional)

        } catch (err) {
            // se update na BD mal sucedido, apaga o ficheiro guardado
            await fs.unlink(req.resultsFile); 
            next(err);
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

module.exports = {
	// updatePedido, ## Deprecated
	updateDataPrimeiroTeste,
    updateResultadoPrimeiroTeste,
    updateDataSegundoTeste,
	updateResultadoSegundoTeste,
    updateTecnicoResponsavel,
    uploadDiagnoseResultsFile
}