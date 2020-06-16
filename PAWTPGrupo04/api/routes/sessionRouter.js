const express = require('express')

const sessionControler = require('../controllers/sessionController')
const sessionRouter = express.Router()

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Allow a user to sign-in with a registered account
 *     description: Check if account exists and if credentials are correct, creating a JWT token session
 *     tags: [Session]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/cc'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       200: 
 *         $ref: '#/responses/SignInSuccess'
 *       404:
 *         $ref: '#/responses/ErrorMessage'
 */
sessionRouter.post('/sign-in', sessionControler.signInUser);

/**
 * @swagger
 * /session-user:
 *   get:
 *     summary: Returns data related to the session's User (id, CC, name and role)
 *     description: If there is a user in session, returns it's model details
 *     tags: [Session]
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: User profile data
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UserInfo'
 *       401:
 *         $ref: '#/responses/ErrorMessage'
 */
sessionRouter.get('/session-user', sessionControler.getLoggedUser);

/**
 * @swagger
 * /sign-out:
 *   get:
 *     summary: Allow a user to clear it's session
 *     description: Signals clearing of the JWT session cookie
 *     tags: [Session]
 *     produces:
 *      - text/plain
 */
sessionRouter.post('/sign-out', sessionControler.signOutUser);

module.exports = sessionRouter;