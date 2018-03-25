const Koa = require('koa')
const views = require('koa-views')
const{resolve} = require('path')
const router = require('koa-router')
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./mongodb.js')
const R = require('ramda')
const MIDDLEWARES = ['router']
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname,`./middleware/${name}.js`)
        )
    )(MIDDLEWARES)
}

;(async()=>{
    await connect()
     initSchemas()
    //require('./api.js')
    //require('./movie.js')
    const app = new Koa()
    await useMiddlewares(app)
    app.listen(3000)
})()


//app.use(router.routes()).use(router.allowedMethods())
