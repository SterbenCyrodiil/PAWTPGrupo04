const User = require('../models/user')

// Apenas para teste, A sério deverá ser com JWT

const registerUser = async (req, res) => {
	const userData = req.body
	console.log("DATA", userData)
	const result = await new User(userData).save()
	res.send(result)
}

module.exports = {
    registerUser
}