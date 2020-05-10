require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const apiRouter = require('./api/routes')
const authMiddleware = require('./api/middleware/authentication')

const app = express()
mongoose.Promise = global.Promise

// // Object destructuring ES6
// const {
// 	PORT = 3000,
// 	MONGO_DB_HOST = 'localhost',
// 	MONGO_BD_PORT = 27017,
// 	MONGO_DB_NAME = 'covidDB',
// } = process.env

mongoose
	.connect(
		`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_BD_PORT}/${process.env.MONGO_DB_NAME}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		}
	)
	.then((mongoose) => {
		console.log('connected to mongo')
	})
	.catch(console.error)

app
	// Setup da aplicação com cors e body-parser para pedidos HTTP
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))

	// Setup com cookie-parser
	.use(cookieParser())

	// app.use(passport.initialize())
	// Middleware para autenticação e sessão de login
	// (Neste caso, a aplicação só pode ser usada por utilizadores com login ativo)
	.use(authMiddleware)

	// Setup do API Router
	.use('/rest', apiRouter)

	.listen(process.env.PORT, () => {
		console.log(`Server started on http://localhost:${process.env.PORT}`)
	})