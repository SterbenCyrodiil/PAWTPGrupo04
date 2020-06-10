require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const swagger = require('./api/swagger/swaggerRouter')
const apiRouter = require('./api')
const authMiddleware = require('./api/middleware/authentication')
const User = require('./api/models/user')

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
	.then(async (mongoose) => {
		console.log('connected to mongo')
		// # Create a new Admin User for the App if noone exist
		const adminUser = await User.findOne({ role: 'ADMIN' }).select('+password')
        if (!adminUser) {
            console.log('creating admin user')
            const adminUser = await new User({
                CC: process.env.ADMIN_CC,
                password: process.env.ADMIN_PASSWORD,
                firstName: process.env.ADMIN_FIRST_NAME,
                lastName: process.env.ADMIN_LAST_NAME,
				genero: process.env.ADMIN_GENDER,
				birthdate: process.env.ADMIN_BIRTH_DATE,
				email: process.env.ADMIN_EMAIL,
				phoneNumber: process.env.ADMIN_PHONE_NUMBER,
                role: 'ADMIN'
            }).save().catch(console.error)

            if (adminUser) {
                console.log('Admin created')
                console.table([adminUser.toJSON()])
            }
        } else {
            console.log('Admin:')
            console.table([adminUser.toJSON()])
        }
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
	// .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
	.use(swagger)

	.listen(process.env.PORT, () => {
		console.log(`Server started on http://localhost:${process.env.PORT}`)
	})

module.exports = app;