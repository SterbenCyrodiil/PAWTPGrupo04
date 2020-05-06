var express = require('express');
var router = express.Router();

const userRouter = require('./users')
const requestRouter = require('./requestrouter')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter);
router.use('/request', requestRouter);


module.exports = router;
