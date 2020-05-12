const express = require('express');

const requestRouter = require('./routes/pedidosRouter')
const userRouter = require('./routes/usersRouter')
const sessionRouter = require('./routes/sessionRouter')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter);
router.use('/request', requestRouter);
router.use(sessionRouter);

module.exports = router;