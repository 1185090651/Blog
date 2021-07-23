const Koa = require('koa');
const router = require('./routes');
const bodyParser = require('./middleware/bodyParser');
const author = require('./middleware/author');
const logger = require('./middleware/logger');

const app = new Koa();

app.use(bodyParser());
app.use(logger());

app.use(author());

app.use(router.routes());
app.use(router.allowedMethods());


module.exports = app;