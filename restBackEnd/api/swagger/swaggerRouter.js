const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const parameters = require('./parameters.json')
const definitions = require('./definitions.json')
const responses = require('./responses.json')

const swaggerRouter = express.Router()
const options = {
	swaggerDefinition: {
		info: {
            version: "1.0.0",
            title: "pawtpRestAPI"
        },
		host: "localhost:3333",
        basePath: "/api",
		parameters,
		definitions,
		responses,
		tags: [
            {
                name: "Session",
                description: "JWT token session"
            },
            {
                name: "Users",
                description: "All Users of the platform, both 'utente', 'tecnico' and 'admin'"
            },
            {
                name: "Pedidos",
                description: "Requests made by 'utente's to be handled by the workers"
            }
        ],
	},
	apis: [
		'api/index.js',
		'api/routes/*Router.js'
	], // Path to the API docs
}
const swaggerSpec = swaggerJSDoc(options)

// # Acesso ao JSON base do Swagger
swaggerRouter.get('/api-docs.json', function (req, res) {
	res.json(swaggerSpec);
})

// # Acesso ao UI do Swagger
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = swaggerRouter