const express = require('express')

const sessionControler = require('../controllers/SessionController')

const sessionRouter = express.Router()

sessionRouter.post('/login', sessionControler.loginUser);

sessionRouter.get('/user', (req, res) => {
	res.json(req.user)
})

sessionRouter.post('/logout', sessionControler.logoutUser)

module.exports = sessionRouter;