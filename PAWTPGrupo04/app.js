require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const apiRouter = require('./api')
const authMiddleware = require('./api/middleware/authentication')

const app = express()
mongoose.Promise = global.Promise

mongoose
	.connect(
		`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_BD_PORT}/${process.env.MONGO_DB_NAME}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true
		}
	)
	.then((mongoose) => {
		console.log('connected to mongo')
	})
	.catch(console.error)

app
	// Setup da aplicação para body-parser para pedidos HTTP
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	//.use(express.static('public'))

	// Setup com cookie-parser
	.use(cookieParser())

	// Middleware para autenticação e sessão
	// (todo o acesso à aplicação está interdito a utilizadores com sessão ativa)
	.use(authMiddleware)

	// Setup do API Router
	.use('/api', cors(), apiRouter)

	// Setup Swagger API Docs
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

	.listen(process.env.PORT, () => {
		console.log(`Server started on http://localhost:${process.env.PORT}`)
	})

module.exports = app;