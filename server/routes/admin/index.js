const router = require('koa-router')()
const userModel = require('../../models/user')
const { analysisToken } = require('../../utils/token')
const { find } = require('../../utils/query')

router.post('/token', async (ctx, next) => {
    const username = analysisToken(ctx.headers.token)
    const res = await find(userModel, {username}, {password: 0,__v: 0, _id: 0})
    ctx.body = {
        ...res[0]
    }
})

module.exports = router