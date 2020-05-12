const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema({
    idRequest: {type: String, required: true},
    dataInicial: {type: Date}, 
    dataFinal: {type: Date}, 
    tecnicoResponsavel: {type: String},
    CCutente: {type: String, required: true},
    trabalhadorDeRisco: {type: Boolean, required: true},
    grupoDeRisco: {type: Boolean, required: true},
    encaminhado_saude24: {type: Boolean, required: true},
    resultadoInicial: {type: Boolean, default: false},
    resultadoFinal: {type: Boolean},
    infetado: {type: Boolean},
    casoFechado: {type: Boolean}, default: false,
    deleted : {type: Boolean, default: false},
	updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Pedido', requestSchema)