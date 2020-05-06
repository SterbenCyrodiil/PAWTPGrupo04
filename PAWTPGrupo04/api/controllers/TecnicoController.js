const Tecnico = require('../models/tecnico')

//Apenas para teste, a sério deverá ser tudo com JWT

const registerTecnico = async (req, res) => {
	const tecnData = req.body
	const result = await new Tecnico(tecnData).save()
	res.send(result)
}

modules.export = {
    registerTecnico
}