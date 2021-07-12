const router = require('koa-router')()
const userModel = require('../../models/login')
const { find, insert } = require('../../utils/query')
const crypto = require('../../utils/crypto')
const createToken = require('../../utils/createToken')

router.post('/login', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.throw(422, 'Not found username or password')
    }
    const res = await find(userModel, { username, password: crypto(password) }, { password: 0 }).catch(err => {
        ctx.throw(500, err)
    })
    ctx.body = {
        ...res[0],
        token: createToken({ ...res[0] })
    }
})

router.post('/register', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.throw(422, 'Not found username or password')
    }
    await insert(userModel, [{ username, password: crypto(password) }]).catch(err => {
        ctx.throw(500, err)
    })
    ctx.body = {
        message: '注册成功'
    }
})

module.exports = router