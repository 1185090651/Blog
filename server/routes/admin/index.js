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
    const { name } = ctx.request.body;
    if (!name) {
        ctx.throw(422, 'name field missing');
    }
    const books = await bookModel.find({ name });
    if (books.length) {
        ctx.throw(423, '该知识库已存在');
    }
    const { _id: userId } = analysisToken(ctx.headers.token);
    const book = new bookModel({
        name, userId
    });
    const data = await book.save();
    ctx.body = data;
});

// 查询知识库
router.get('/book', async ctx => {
    const { _id: userId } = analysisToken(ctx.headers.token);
    // 倒序
    const books = await bookModel.find({ userId }).lean().sort({ _id: -1 });
    ctx.body = books;
});

// 添加文章
router.post('/article', async ctx => {
    const { title, bookId } = ctx.request.body;
    if (!title) {
        ctx.throw(422, 'title field missing');
    }
    const book = await bookModel.findOne({ _id: bookId });
    const haveSameArticle = book.articles.some(item => {
        return item.title === title;
    });
    if (haveSameArticle) {
        ctx.throw(423, '文章名称重复！');
    }
    const res = await bookModel.updateOne({ _id: bookId }, { $addToSet: { articles: [{ title }] } });
    if (res.n) {
        ctx.body = 1;
    }
});

// 修改文章
// router.post('/article/:id', async ctx => {

// });

module.exports = router;