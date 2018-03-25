const {Route} = require('../lib/decorator')
const { resolve } =require('path')
export const router = app => {
    const apipath = resolve(__dirname,'../routes')
    const router = new Route(app, apipath)
    router.init()
}