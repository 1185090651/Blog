const Koa = require('koa')
const router = require('./routes')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(9527, () => {
    console.log('server is running at http://localhost:9527')
})