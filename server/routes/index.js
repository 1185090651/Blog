const router = require('koa-router')();
const user = require('./user');
const admin = require('./admin');

router.use('/user', user.routes());
router.use('/admin', admin.routes());


module.exports = router;