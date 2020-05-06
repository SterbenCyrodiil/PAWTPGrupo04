const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema({
    id: String,
    tecnico_responsavel: Number,
    CC_utente: String,
    infetado: Boolean,
    suspeito: Boolean,
    trabalhador_de_risco: Boolean,
    grupo_de_risco: Boolean,
    encaminhado_saude24: Boolean,
    teste_realizado: Boolean,
    resultado: Boolean,
	updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Pedido', requestSchema)