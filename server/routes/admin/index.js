const router = require('koa-router')()
const userModel = require('../../models/user')
const { analysisToken } = require('../../utils/token')

router.post('/token', async (ctx, next) => {
    const username = analysisToken(ctx.headers.token)
    const res = await userModel.find({username}, {password: 0, _id: 0}).lean()
    ctx.body = {
        ...res[0]
    }
})

module.exports = router