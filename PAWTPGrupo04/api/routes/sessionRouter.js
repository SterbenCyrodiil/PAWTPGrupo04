const express = require('express')

const authorization = require('../middleware/authorization')
const sessionControler = require('../controllers/sessionController')
const sessionRouter = express.Router()

sessionRouter.post('/sign-in', sessionControler.signInUser);

sessionRouter.get('/user-profile', authorization(['admin', 'tecnico', 'utente']), sessionControler.getLoggedUser);

sessionRouter.post('/sign-out', authorization(['admin', 'tecnico', 'utente']), sessionControler.signOutUser);

module.exports = sessionRouter;