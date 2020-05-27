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
			_id: result._id, CC: result.CC, name: result.name, genero: req.body.genero, 
			birthdate: req.body.birthdate, phoneNumber: req.body.phoneNumber, role: result.role
		}
		res.status(200).json({success: true, data: user});
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
	res.status(200).send(request);
}

const getAllUtentes = async (req, res) => {
	const request = await User.find({role: "utentes"}, userResUtente);
	res.status(200).send(request);
}

const getAllTecnicos = async (req, res) => {
	const request = await User.find({role: "tecnicos"}, userResTecnico);
	res.status(200).send(request);
}

const getUserByID = async (req, res) =>{
	try {
		const request = await User.findById(req.params.id, userRes)

		if (request) 
			res.status(200).send(request)
		else
			res.status(404).send("User could not be found")
	} catch (e) {
		if (e.name === 'CastError') {
			res.status(404).send("User could not be found")
		} else {
			console.error(e)
			res.status(500).send(null)
		}
	}
}

const getUserByCC = async (req, res) =>{
	try {
		const request = await User.findOne({CC: req.params.id}, userRes)
		
		if (request) 
			res.status(200).send(request)
		else
			res.status(404).send("User could not be found")
	} catch (e) {
		console.error(e)
		res.status(500).send(null)
	}
}

const getUtenteUserByCC = async (req, res) =>{
	try {
		const request = await User.findOne({CC: req.params.id, role: "utente"}, userResUtente)
		
		if (request) 
			res.status(200).send(request)
		else
			res.status(404).send("User could not be found")
	} catch (e) {
		console.error(e)
		res.status(500).send(null)
	}
}

const getTecnicoUserByCC = async (req, res) =>{
	try {
		const request = await User.findOne({CC: req.params.id, role: "tecnico"}, userResTecnico)
		
		if (request) 
			res.status(200).send(request)
		else
			res.status(404).send("User could not be found")
	} catch (e) {
		console.error(e)
		res.status(500).send(null)
	}
}

const deleteUser = async (req, res) => {
	try {
		let oldUserInfo = await User.findById(req.params.id)

		if (!oldUserInfo) {
			res.status(404).send("User could not be found")
		}
		else if (oldUserInfo.deleted === true) {
			res.status(404).send('Utilizador já foi eliminado. ' 
					+ 'No entanto, o mesmo CC só poderá ser registado após a entrada na BD ser removida!');
		} else {
			oldUserInfo = await User.findByIdAndUpdate(
				req.params.id, { deleted: true }).select(userRes)
			res.status(200).send({
				old: oldUserInfo
			})
		}
	} catch (e) {
		if (e.name === 'CastError') {
			res.status(404).send("User could not be found")
		} else {
			console.error(e)
			res.status(500).send(null)
		}
	}
}

const updateUserInformation = async (req, res) => {
	// ## Só será possível atualizar a informação se o próprio utilizador estiver com a sessão ativa
	// ## ou o utilizador é um admin (isto poderá ser alterado para aumentar a segurança)
	if (req.user_data.role !== 'admin' && req.params.id !== req.user_data._id) {
		res.status(403).send('Necessário ter a sessão iniciada deste utilizador para atualizar os dados');
	} else {
		try {
			const outdated = await User.findById(req.params.id, userRes)

			if (outdated) {
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

				const updated = await User.findByIdAndUpdate( req.params.id, userData, { runValidators: true })
					.select(userRes).setOptions({new: true})

				res.status(200).send({
					old:outdated,
					new:updated
				})
			} else {
				res.status(404).send("User could not be found")
			}
		} catch (err){
			if (err.name === 'CastError') {
				res.status(404).send("User could not be found")
			} else {
				console.error(err)
				res.status(500).send(null)
			}
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