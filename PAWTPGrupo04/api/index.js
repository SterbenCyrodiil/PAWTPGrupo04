const express = require('express');

const sessionRouter = require('./routes/sessionRouter')
const userRouter = require('./routes/usersRouter')
const userListsRouter = require('./routes/usersListRouter')
const requestRouter = require('./routes/pedidosRouter')
const requestListsRouter = require('./routes/pedidosListRouter')
const requestUpdatesRouter = require('./routes/pedidosUpdateRouter')

const authorization = require('./middleware/authorization')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 'ok'
  })
});

// ## Sign-in, Profile e Sign-Out
router.use(sessionRouter);
// ## Registo, delete e atualização de Users
router.use('/users', userRouter);
// ## Listagens de Users
router.use('/users', authorization(['ADMIN', 'TECNICO']), userListsRouter);
// ## Registo novos Pedidos, delete e informações sobre um Pedido único */
router.use('/requests', requestRouter);
// ## Listagens de Pedidos
router.use('/requests', authorization(['ADMIN', 'TECNICO']), requestListsRouter);
// ## Etapas de atualização dos Pedidos
router.use('/requests/update', authorization(['ADMIN', 'TECNICO']), requestUpdatesRouter);

// ## Ultimo middleware para gestão de todo o errorhandling!
router.use(function (err, req, res, next) {
  if (err.code === 11000) { // unique value já existe na DB
    res.status(404)
    err.message = 'MongoError: duplicate key error collection. Entity already exists in database'
  }
  else if (err.name === 'ValidationError') {
    console.error('Mongoose Validation Error: You should send error list to the client')
    res.status(400)
  } 
  else {
    // use the error's status or default to 500
    res.status(err.status || 500);
  }

  console.log(err)

  // send back json data
  res.send({
    message: err.message
  })
})


module.exports = router;