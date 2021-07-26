const router = require('koa-router')();
const userModel = require('../../models/user');
const crypto = require('../../utils/crypto');
const { createToken } = require('../../utils/token');

router.post('/login', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.throw(422, 'Not found username or password');
    }
    try {
        const res = await userModel.find({ username, password: crypto(password) }, { password: 0 }).lean();
        if (res.length) {
            ctx.body = {
                ...res[0],
                token: createToken({ ...res[0] })
            };
        } else {
            ctx.throw(401, '用户名不存在或密码错误');
        }
    } catch (error) {
        ctx.throw(500, error);
    }
});

router.post('/register', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.throw(422, 'Not found username or password');
    }
    try {
        const res = await userModel.find({ username });
        if (res.length) {
            return ctx.body = {
                message: '用户名已存在！'
            };
        }
    } catch (error) {
        ctx.throw(500, error);
    }
    try {
        await userModel.insertMany({ username, password: crypto(password) });
        ctx.body = {
            message: '注册成功'
        };
    } catch (error) {
        ctx.throw(500, error);
    }
});

module.exports = router;