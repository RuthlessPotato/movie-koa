const mongoose = require('mongoose')
const {get,post,put,controller} =require('../lib/decorator')
const { checkPassword
    } = require('../service/user.js')
@controller('/api/v0/user')
export class userController {
    @post('/')
    async login(ctx,next){
        const { email, password } = ctx.params.body
        const matchData = await checkPassword(email,password)
        if(!matchData.user){
            return (ctx.body =  {
                success:false,
                err:"用户不存在"
            })
        }
        if(matchData.match){
            return (ctx.body = {
                success:false,
                err:"用户不存在"
            })
        }
       
            return (ctx.body = {
                success:false,
                err:"用户不存在"
        })
    }
}