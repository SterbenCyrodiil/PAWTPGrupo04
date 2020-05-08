const mongoose = require('mongoose')


const GenderEnum = Object.freeze({
	Male: 'male',
	Female: 'female',
	Other: 'other',
  });

const StateEnum = Object.freeze({
	Suspeito: 'suspeito',
	Infetado: 'infetado',
	Regularizado: 'regularizado'
  });

  const RolesEnum = Object.freeze({
	Admin: 'admin',
	Tecnico: 'tecnico',
	Utente: 'utente',
  });

const userSchema = new mongoose.Schema({

	name:{ type: String, required: true },
	genero: {type: String, required: true, enum: Object.values(GenderEnum)},
	CC: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	birthdate: {type: Date, required: true},
	phoneNumber:{type: Number, required: true },
	role: { type: String, required: true, enum: Object.values(RolesEnum)},
	estado: {type: String, required:true, enum: Object.values(StateEnum)},
	deleted: {type: Boolean, default: false},
	updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)