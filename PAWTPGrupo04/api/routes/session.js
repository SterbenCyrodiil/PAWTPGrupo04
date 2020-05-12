const express = require('express')

const sessionControler = require('../controllers/SessionController')

const sessionRouter = express.Router()

sessionRouter.post('/sign-in', sessionControler.signInUser);

sessionRouter.get('/user-profile', sessionControler.getLoggedUser)

sessionRouter.post('/sign-out', sessionControler.signOutUser)

module.exports = sessionRouter;