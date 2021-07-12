const router = require('koa-router')()
const userModel = require('../../models/login')
const { find, insert } = require('../../utils/query')

router.post('/', async ctx => {
    console.log(ctx.request.body)
    const res = await insert(userModel, [ctx.request.body])
    console.log(res)
    ctx.body = {
        x: 1,
        y: 2
    }
})

router.get('/', async ctx => {
    const res = await find(userModel)
    console.log(res)
})

module.exports = router