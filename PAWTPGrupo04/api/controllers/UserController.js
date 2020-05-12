const User = require('../models/user')

// Estou a, essencialmente, utilizar o ID random do mongo para quase tudo. 
// Isto poderá ser alterado, no entando, creio que funcionará bem assim, se modelarmos bem daqui para a frente.

const registerUser = async (req, res) => {
	const userData = req.body
	console.log("DATA", userData)
	const result = await new User(userData).save()
	res.send(result)
}

const getAllUsers = async (req, res) => {
	const request = await User.find({},"name genero birthdate phoneNumber");
	res.send(request);
}

const getAllUtentes = async (req, res) => {
	const request = await User.find({role: "utentes"},"name genero birthdate phoneNumber");
	res.send(request);
}

const getAllTecnicos = async (req, res) => {
	const request = await User.find({role: "tecnicos"},"name genero birthdate phoneNumber");
	res.send(request);
}

const getUserByID = async (req, res) =>{
	try {
		const request = await User.findById(req.params.id,"name genero birthdate phoneNumber")
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

const getUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id}, "name genero birthdate phoneNumber")
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

const getUtenteUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id, role: "utente"}, "name genero birthdate phoneNumber")
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

const getTecnicoUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id, role: "tecnico"}, "name genero birthdate phoneNumber")
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

const updateUserInformation = async(req, res) => {
	try{const outdaded = await User.findByIdAndUpdate(
		req.params.id,
		req.body)
	const updated = await User.findById(req.params.id)
	res.send({
		old:outdaded,
		new:updated
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
	deleteUser,
	getUserByCC,
	updateUserInformation,
	getAllTecnicos,
	getAllUtentes,
	getTecnicoUserByCC,
	getUtenteUserByCC
}