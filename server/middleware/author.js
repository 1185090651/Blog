const jwt = require('jsonwebtoken') // 引入生成token的第三方包
const { tokenSecret } = require('../config')

module.exports = () => {
    return async (ctx, next) => {
        // 拿到token
        const raw = String(ctx.headers.authorization);
        // 如果没有token
        if (raw === 'undefined') {
            return ctx.throw(422, 'Missing authorization')
        }
        try {
            // 解token
            let { id } = jwt.verify(raw, tokenSecret);
            next()

        } catch (err) {
            return ctx.body({
                meta: {
                    msg: "请重新登录",
                    code: 422
                }
            })
        }
    }
}