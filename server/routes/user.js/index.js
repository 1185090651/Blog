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
    try {
        const res = await find(userModel, { username, password: crypto(password) }, { password: 0,__v: 0, _id: 0 })
        ctx.body = {
            ...res[0],
            token: createToken({ ...res[0] })
        }
    } catch (error) {
        ctx.throw(500, error)
    }
})

router.post('/register', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.throw(422, 'Not found username or password')
    }
    try {
        const res = await find(userModel, { username })
        console.log(res);
        if(res.length) {
            return ctx.body = {
                message: '用户名已存在！'
            }
        }
    } catch (error) {
        ctx.throw(500, error)
    }
    try {
        await insert(userModel, [{ username, password: crypto(password) }])
        ctx.body = {
            message: '注册成功'
        }
    } catch (error) {
        ctx.throw(500, error)
    }
})

module.exports = router