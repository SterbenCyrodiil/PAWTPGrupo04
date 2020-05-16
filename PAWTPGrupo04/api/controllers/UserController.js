const User = require('../models/user')
const bcrypt = require('bcryptjs')

const userRes = "CC name genero birthdate phoneNumber role"
const userResUtente = "CC name genero birthdate phoneNumber estado"
const userResTecnico = "CC name genero birthdate phoneNumber"

const registerUser = async (req, res) => {
	try {
		console.log("BODY DATA", req.body);
		// ## Guardar só informação correta, uma vez que pode chegar qualquer coisa pelo body
		const userData = {
			CC: req.body.CC, password: req.body.password, name: req.body.name,
			genero: req.body.genero, birthdate: req.body.birthdate, phoneNumber: req.body.phoneNumber
		}
		const result = await new User(userData).save();
		console.log("SAVED DATA", result);
		// ## Enviar de volta só informação relevante, evitando reenviar a password encriptada
		const user = {
			_id: result._id, CC: result.CC, name: result.name,
			genero: req.body.genero, birthdate: req.body.birthdate, phoneNumber: req.body.phoneNumber,
			role: result.role,estado: result.estado
		}
		res.status(200).json({success: true, msg: user});
	} catch (err) {
		if (err.code === 11000) { // utilizador ja existe
			res.status(404).json({success: false, msg: 'O utilizador já se encontra registado!'});
		} else {
			console.log(err);
			res.status(404).json({success: false, msg: 'Dados em falta, incorretos!'});
		}
	}
}

const getAllUsers = async (req, res) => {
	const request = await User.find({}, userRes);
	res.send(request);
}

const getAllUtentes = async (req, res) => {
	const request = await User.find({role: "utentes"}, userResUtente);
	res.send(request);
}

const getAllTecnicos = async (req, res) => {
	const request = await User.find({role: "tecnicos"}, userResTecnico);
	res.send(request);
}

const getUserByID = async (req, res) =>{
	try {
		const request = await User.findById(req.params.id, userRes)
			.catch((e) => {
				return null
			})
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(404).send(null)
	}
}

const getUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id}, userRes)
			.catch((e) => {
				return null
			})
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(404).send(null)
	}
}

const getUtenteUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id, role: "utente"}, userResUtente)
			.catch((e) => {
				return null
			})
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(404).send(null)
	}
}

const getTecnicoUserByCC = async (req, res) =>{
	try {
		const request = await User.find({CC: req.params.id, role: "tecnico"}, userResTecnico)
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
	try {
		let oldUserInfo = await User.findById(req.params.id)

		if (oldUserInfo.deleted === true) {
			res.status(403).send('Utilizador já ');
		} else {
			oldUserInfo = await User.findByIdAndUpdate(
				req.params.id, { deleted: true }).select(userRes)
			const updatedUser = await User.findById(req.params.id)
			res.status(200).send({
				old:oldUserInfo
			})
		}
	} catch (e){
		console.log(e)
		res.status(404).send(null)
	}
}

const updateUserInformation = async (req, res) => {
	// ## Só será possível atualizar a informação se o próprio utilizador estiver com a sessão ativa
	// ## ou o utilizador é um admin (isto poderá ser alterado para aumentar a segurança)
	if (req.user_data !== 'admin' && req.params.id !== req.user_data._id) {
		res.status(403).send('Necessário ter a sessão iniciada deste utilizador para atualizar os dados');
	} else {
		try {
			// ## Atualizar só informação correta, uma vez que pode chegar qualquer coisa pelo body
			const userData = {};
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
        		userData.password = await bcrypt.hash(req.body.password, salt);
			}
			if (req.body.name)
				userData.name = req.body.name;
			if (req.body.genero)
				userData.genero = req.body.genero;
			if (req.body.birthdate)
				userData.birthdate = req.body.birthdate;
			if (req.body.phoneNumber)
				userData.phoneNumber = req.body.phoneNumber;

			const outdated = await User.findByIdAndUpdate( req.params.id, userData )
				.select(userRes)

			const updated = await User.findById(
				req.params.id, userRes)
			res.send({
				old:outdated,
				new:updated
			})
		} catch (err){
			console.log(err)
			res.status(404).send(null)
		}
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