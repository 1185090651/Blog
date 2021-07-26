const router = require('koa-router')();
const userModel = require('../../models/user');
const bookModel = require('../../models/book');
const { analysisToken } = require('../../utils/token');

router.post('/token', async ctx => {
    const { username } = analysisToken(ctx.headers.token);
    const res = await userModel.find({ username }, { password: 0, _id: 0 }).lean();
    ctx.body = {
        ...res[0]
    };
});

// 创建知识库
router.post('/book', async ctx => {
    const { name, description } = ctx.request.body;
    if (!name) {
        ctx.throw(422, 'name field missing');
    }
    const books = await bookModel.find({ name });
    if (books.length) {
        return ctx.body = {
            message: '该知识库已存在'
        };
    }
    const { _id: userId } = analysisToken(ctx.headers.token);
    const book = new bookModel({
        name, description, userId
    });
    await book.save();
    ctx.body = {
        message: '添加知识库成功'
    };
});

// 查询知识库
router.get('/book', async ctx => {
    const { _id: userId } = analysisToken(ctx.headers.token);
    const books = await bookModel.find({ userId }).lean();
    ctx.body = {
        books
    };
});

module.exports = router;