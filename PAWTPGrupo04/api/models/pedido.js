const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    idRequest: {type: String, required: true, unique: true},
    CCutente: {type: String, required: true},
    trabalhadorDeRisco: {type: Boolean, required: true},
    grupoDeRisco: {type: Boolean, required: true},
    encaminhado_saude24: {type: Boolean, required: true},
    
    tecnicoResponsavel: {type: String},

    dataInicial: {type: Date},
    resultadoInicial: {type: Boolean, default: false}, 
    dataFinal: {type: Date},
    resultadoFinal: {type: Boolean},
    
    infetado: {type: Boolean},
    casoFechado: {type: Boolean}, default: false,
    filepath:{type: String},
    deleted: {type: Boolean, default: false},
	updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Pedido', requestSchema)