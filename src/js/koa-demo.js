const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const Router = require('koa-router')
//const loggerGenerator = require('./middleware/logger-generator.js')
//app.use(convert(loggerGenerator()))
//app.use(loggerGenerator())
const home = new Router()
home.get('/',async (ctx) => {
    let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})
const page = new Router()
page.get('/404',async (ctx) => {
    ctx.body = '404 page!'
}).get('/helloworld',async (ctx) =>{
    ctx.body = 'nihao '
})
let router = new Router()
router.use('/',home.routes(),home.allowedMethods())
router.use('/page',page.routes(),page.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,() =>{
    console.log('[demo] route-use-middleware is starting at port 3000')
})

