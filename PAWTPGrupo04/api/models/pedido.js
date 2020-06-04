const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    idRequest: {
        type: String, required: true, unique: true
    },
    CCutente: {
        type: String, required: true
    },
    trabalhadorDeRisco: {
        type: Boolean, required: true, default: false
    },
    grupoDeRisco: {
        type: Boolean, required: true, default: false
    },
    encaminhado_saude24: {
        type: Boolean, required: true, default: false
    },
    
    tecnicoResponsavel: {
        type: String
    },

    dataInicial: {
        type: Date
    },
    resultadoInicial: {
        type: Boolean
    }, 
    dataFinal: {
        type: Date
    },
    resultadoFinal: {
        type: Boolean
    },
    
    infetado: {
        type: Boolean
    },
    casoFechado: {
        type: Boolean, required: true, default: false
    },
    filepath:{
        type: String
    },
    deleted: {
        type: Boolean, default: false,
        select: false // Prevent from being populated
    },
	updated_at: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Pedido', requestSchema)