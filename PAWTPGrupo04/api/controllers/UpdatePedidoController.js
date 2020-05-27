const fs = require('fs').promises;

const Pedido = require('../models/pedido')
const User = require('../models/user')

const updateDataPrimeiroTeste = async (req, res) => {
    let pedido = null;
    try {
        pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
    } catch (err) { // catch erro de parsing do mongoose uma vez que procuramos pelo ObjectId
        res.status(404).send('Pedido de Diagnóstico não existe!')
    }

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
    }
    else if (pedido.resultadoInicial != null) { // Data do teste é atualizada só se ainda não existem resultados do primeiro teste
        res.status(404).send('Não foi possível atualizar a data. O teste já foi realizado.');
    }
	else if (!req.body.testDate) { // 'dataInicial' não está presente no body
		res.status(400).send('Bad Request. Dados sobre a data do teste em falta!')
	}
	else {
		try {
			// ## Marcar a data do primeiro teste # Será o primeiro update para o diagnostico
            const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                { dataInicial: req.body.testDate }).setOptions({new: true});

            // const updatedPedido = await Pedido.findById(req.params.id);
            res.status(200).send({
                msg: "Data atualizada com sucesso",
                old: pedido,
                new: updatedPedido
            });

		} catch (err) {
            console.log(err);
            if (err.name === 'CastError') {
                res.status(404).send(`Error: ${err.message}`);
            } else {
                res.status(500).send('Something went wrong while updating data :(');
            }
		}
	}
}

const updateResultadoPrimeiroTeste = async (req, res) => {
	let pedido = null;
    try {
        pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
    } catch (err) { // catch erro de parsing do mongoose uma vez que procuramos pelo ObjectId
        res.status(404).send('Pedido de Diagnóstico não existe!')
    }

    console.log("sakdhaskjdhsajkdhaskdh")

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
    }
    else if (pedido.dataInicial == null) { // Resultado do teste só é atualizado se existir uma data marcada
        res.status(404).send('Deverá ser agendada uma data para o teste antes de serem inseridos os resultados!');
    }
    else if (req.body.testResult == undefined) { // 'resultadoInicial' em falta no body
        res.status(400).send('Bad Request! Resultado do teste em falta.');
    }
	else {
		try {
            if (req.body.testResult === false && req.body.secondTestDate) 
            { // Marcar a data para o segundo teste (48 horas de diferença) se o primeiro teste der negativo
                
                var resMsg = '', updatedPedido;
                if (((new Date (req.body.secondTestDate).getTime() - pedido.dataInicial.getTime()) / 3600000) <= 48) {
                    updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                        { resultadoInicial: req.body.testResult, dataFinal: req.body.secondTestDate }).setOptions({new: true});
                    resMsg = 'Resultado atualizado com sucesso. Data do próximo teste agendada';
                    
                } else {
                    updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                        { resultadoInicial: req.body.testResult }).setOptions({new: true});
                    resMsg = 'Resultado atualizado com sucesso. Não foi possível agendar o segundo teste. A diferença de datas não deverá ser superior a 48 horas! Deverá reagendar uma nova data.'
                }
                await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'suspeito' });

                res.status(200).send({
                    msg: resMsg,
                    old: pedido,
                    new: updatedPedido
                });
                
            } else if (req.body.testResult === true) 
            { // caso o primeiro teste seja positivo, dá-se o diagnóstico como fechado

                const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                    { resultadoInicial: req.body.testResult, casoFechado: true, infetado: true}).setOptions({new: true});
                await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'infetado' });

                res.status(200).send({
                    msg: 'Resultado atualizado com sucesso',
                    old: pedido,
                    new: updatedPedido
                });
                
            } else { // 'dataFinal' em falta no body
                res.status(400).send('Bad Request! Data do segundo teste em falta.');
            }
            
		} catch (e) {
			console.log(e);
			res.status(500).send('Something went wrong while updating data :(');
		}
	}

}

const updateDataSegundoTeste = async (req, res) => {
	let pedido = null;
    try {
        pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
    } catch (err) { // catch erro de parsing do mongoose uma vez que procuramos pelo ObjectId
        res.status(404).send('Pedido de Diagnóstico não existe!')
    }

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) { 
		res.status(404).send('Pedido de Diagnóstico já foi concluído!')
    }
    else if (pedido.resultadoInicial == null) {
        res.status(404).send('Ainda não foi concluído um primeiro teste!')
    }
	else if (!req.body.testDate) { // 'dataFinal' não está presente no body
		res.status(400).send('Bad Request. Dados sobre a data do teste em falta')
	} else {
        try {
            if (((new Date (req.body.testDate).getTime() - pedido.dataInicial.getTime()) / 3600000) <= 48) {
                const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                    { dataFinal: req.body.testDate }).setOptions({new: true});
                res.status(200).send({
                    msg: 'Data atualizada com sucesso',
                    old: pedido,
                    new: updatedPedido
                });

            } else {
                res.status(404).send('A diferença de datas não deverá ser superior a 48 horas!')
            }
        } catch (e) {
			console.log(e);
			res.status(500).send('Something went wrong while updating data :(');
		}
	}
}

const updateResultadoSegundoTeste = async (req, res) => {
	let pedido = null;
    try {
        pedido = await Pedido.findById(req.params.id); // guardar o pedido que vai ser atualizado
    } catch (err) { // catch erro de parsing do mongoose uma vez que procuramos pelo ObjectId
        res.status(404).send('Pedido de Diagnóstico não existe!')
    }

	if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
	}
	else if (pedido.casoFechado === true) {
        res.status(404).send('Pedido de Diagnóstico já foi concluído!')
    }
    else if (pedido.dataFinal == null) { // Resultado do teste só é atualizado se existir uma data marcada
        res.status(404).send('Deverá ser agendada uma data para o teste antes de serem inseridos os resultados!');
    }
	else if (req.body.testResult == undefined) { // 'resultadoFinal' não está presente no body
		res.status(400).send('Bad Request. Dados sobre o resultado do teste em falta!')
	}
	else {
		try {
            // ## Marcar o resultado do segundo teste # Será o possível terceiro update para o diagnostico

            var updatedPedido;
            if (req.body.testResult === false) 
            { // Marcar o caso como infetado ou não consoante o resultado do teste
                updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                    { resultadoFinal: req.body.testResult, casoFechado: true, infetado: false}).setOptions({new: true});
                await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'regularizado' });

            } else {
                updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                    { resultadoFinal: req.body.testResult, casoFechado: true, infetado: true}).setOptions({new: true});
                await User.findOneAndUpdate({CC: pedido.CCutente}, { estado: 'infetado' });
            }

            res.status(200).send({
                msg: 'Resultado atualizado com sucesso',
                old: pedido,
                new: updatedPedido
            });

		} catch (e) {
			console.log(e);
			res.status(500).send('Something went wrong while updating data :(');
		}
	}
}

const updateTecnicoResponsavel = async (req, res) => {
	if (req.body.tecnico) {
		try {
            const outdadRequest = await Pedido.findByIdAndUpdate(req.params.id, 
                { tecnicoResponsavel: req.body.tecnico })
			const updatedRequest = await Pedido.findById(req.params.id)
			res.status(200).send({
                msg: 'Tecnico responsável atualizado com sucesso',
				old: outdadRequest,
				new: updatedRequest
			})
		} catch (e) {
            if (err.name === 'CastError') {
				res.status(404).send('Pedido de Diagnóstico não existe!')
			} else {
                console.log(e)
			    res.status(500).send('Something went wrong while updating data :(');
            }
		}
	} else {
		res.status(400).send('Bad Request. Dados sobre o tecnico em falta!');
	}
}

const uploadDiagnoseResultsFile = async (req, res) => {
    let pedido = null;
    try {
        pedido = await Pedido.findById(req.params.id);
    } catch (err) { // catch erro de parsing do mongoose uma vez que procuramos pelo ObjectId
        res.status(404).send('Pedido de Diagnóstico não existe!')
    }

    if (!pedido) {
		res.status(404).send('Pedido de Diagnóstico não existe!')
    }
    else if (pedido.casoFechado === false) {
        res.status(404).send('Pedido de Diagnóstico ainda não foi concluído!')
    }
    else if (!req.file) { // verificar se o ficheiro de detalhes do resultado do diagnostico foi recebido
        res.status(400).send('Bad Request. Ficheiro PDF de detalhes do resultado não foi recebido!')
    }
    else {
        try {
            const toFilePath = `./files/results/diagnose_results_${ pedido.idRequest }_${ Date.now() }.pdf`;

            // ler os dados do PDF temporario
            const tempFileData = await fs.readFile(req.file.path); 

            // escrever o conteúdo para o ficheiro a guardar
            await fs.writeFile(toFilePath, tempFileData);
            req.resultsFile = toFilePath;

            // remover o ficheiro temporario (opcional)
            // await fs.unlink(req.file.path);

            const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, 
                { filepath: toFilePath}).setOptions({new: true});

            res.status(200).send({
                msg: 'Ficheiro guardado com sucesso',
                old: pedido,
                new: updatedPedido
            });
            
        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong while updating data :(');
            await fs.unlink(req.resultsFile);
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