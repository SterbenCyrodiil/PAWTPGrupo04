const User = require('../models/user')

// Apenas para teste, A sério deverá ser com JWT

const registerUser = async (req, res) => {
	const userData = req.body
	console.log("DATA", userData)
	const result = await new User(userData).save()
	res.send(result)
}

const getAllUsers = async (req, res) => {
	const request = await User.find();
	res.send(request);
}

const getUserByID = async (req, res) =>{
	try {
		const request = await User.findById(req.params.id)
			.catch((e) => {
				return null
			})
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(404)
		res.send(null)
	}
}

const deleteUser = async (req, res) => {
	try{
		const oldUserInfo = await User.findByIdAndUpdate(
		req.params.id,
		{ deleted: true })
	const updatedUser = await User.findById(req.params.id)
	res.send({
		old:oldUserInfo,
		new:updatedUser
	})
	} catch (e){
		console.log(e)
		res.status(404)
		res.send(null)
	}
}


module.exports = {
	registerUser,
	getAllUsers,
	getUserByID,
	deleteUser
}