const User = require('../models/user')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
	console.log("BODY DATA", req.body);
	// ## Guardar informação do body
	const userData = {
		CC: req.body.CC, password: req.body.password, 
		firstName: req.body.firstName, lastName: req.body.lastName,
		genero: req.body.genero, birthdate: req.body.birthdate, 
		phoneNumber: req.body.phoneNumber, email: req.body.email
	}
	const result = await new User(userData).save().catch(next);

	if (result) {
		console.log("SAVED DATA", result);
		result.password = result.deleted = undefined
		res.json({
			data: result
		});
	} else {
		next({
			message: 'User not found',
			status: 404
		})
	}
}

const getAllUsers = async (req, res, next) => {
	const request = await User.find({}).catch(next);
	res.json(request);
}

const getAllUtentes = async (req, res, next) => {
	const request = await User.find({role: "UTENTE"}, '+estado').catch(next);
	res.json(request);
}

const getAllTecnicos = async (req, res, next) => {
	const request = await User.find({role: "TECNICO"}).catch(next);
	res.json(request);
}

const getUserByID = async (req, res, next) =>{
	const request = await User.findById(req.params.id).catch(next);

	if (request) {
		res.json(request)
	} else {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
}

const getUserByCC = async (req, res, next) =>{
	const request = await User.findOne({CC: req.params.id}).catch(next);
	
	if (request) {
		res.status(200).send(request)
	} else {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
}

const getUtenteUserByCC = async (req, res, next) =>{
	const request = await User.findOne({CC: req.params.id, role: "UTENTE"}, '+estado').catch(next);
	
	if (request) {
		res.json(request)
	} else {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
}

const getTecnicoUserByCC = async (req, res, next) =>{
	const request = await User.findOne({CC: req.params.id, role: "tecnico"}).catch(next);
	
	if (request) {
		res.status(200).send(request)
	} else {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
}

const deleteUser = async (req, res, next) => {
	let userInfo = await User.findById(req.params.id, '+deleted').catch(next);

	if (!userInfo) {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
	else if (userInfo.deleted === true) {
		next({
			message: 'Utilizador já foi eliminado. ' 
				+ 'No entanto, o mesmo CC só poderá ser registado após a entrada na BD ser removida!',
			status: 404
		})
	} else {
		userInfo = await User.findByIdAndUpdate(req.params.id, { deleted: true }).catch(next);
		res.json({
			old: userInfo
		})
	}
}

const updateUserRole = async (req, res, next) => {
	if (!req.body.role) { // Passa para a próxima rota (abaixo) quando o update não fôr da 'role'
		next();
		return;
	}

	const updated = await User.findByIdAndUpdate(
		req.params.id, { role: req.body.role }, { runValidators: true, new: true }).catch(next)
	
	if (updated) {
		res.json({
			user: updated
		})
	} else {
		next({
			message: 'User could not be found',
			status: 404
		})
	}
}

const updateUserInformation = async (req, res, next) => {
	// ## Só será possível atualizar a informação se o próprio utilizador estiver com a sessão ativa ou o utilizador é um admin
	if (req.session.role !== 'ADMIN' && req.params.id !== req.session._id) {
		next({
			message: 'Permissões adicionais em falta.', 
			status: 403
		})
	} else {
		const outdated = await User.findById(req.params.id).catch(next);

		if (outdated) {
			// ## Atualizar informação que chega pelo body
			const userData = {};
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
				userData.password = await bcrypt.hash(req.body.password, salt);
			}
			if (req.body.firstName)
				userData.firstName = req.body.firstName;
			if (req.body.lastName)
				userData.lastName = req.body.lastName;
			if (req.body.genero)
				userData.genero = req.body.genero;
			if (req.body.birthdate)
				userData.birthdate = req.body.birthdate;
			if (req.body.phoneNumber)
				userData.phoneNumber = req.body.phoneNumber;
			if (req.body.email)
				userData.email = req.body.email;

			userData.updated_at = Date.now();
			const updated = await User
					.findByIdAndUpdate( req.params.id, userData, { runValidators: true, new: true })
					.catch(next)

			res.json({
				old:outdated,
				new:updated
			})
		} else {
			next({
				message: 'User could not be found',
				status: 404
			})
		}
	}
}

module.exports = {
	registerUser,
	getAllUsers,
	getUserByID,
	getUserByCC,
	getAllTecnicos,
	getAllUtentes,
	getTecnicoUserByCC,
	getUtenteUserByCC,
	deleteUser,
	updateUserRole,
	updateUserInformation
}