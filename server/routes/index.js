const router = require('koa-router')()
const login = require('./user.js')

router.use('/user', login.routes())


module.exports = router;