const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

	name:{ type: String, required: true },
	CC: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, default: 'user' },
	updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)