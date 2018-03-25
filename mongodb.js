const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise
exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./database/schema','**/*.js')).forEach(require)
}
exports.connect = () => {
    // if(process.env.NODE_ENV !== production){
    //     mongoose.set('debug',true)
    // }
    return new Promise((resolve,reject) => {
        let maxConnectionTimes = 0
    mongoose.connect(db)
    mongoose.connection.on('disconnected',() =>{
        maxConnectionTimes++
        if(maxConnectionTimes<5){
            mongoose.connect(db)
        }else{
            throw new Error('数据库挂了，去修吧')
        }
       
    })
    mongoose.connection.on('error',(err) =>{
        reject(err)
        console.log(err)
    })
    mongoose.connection.on('open',() =>{
        resolve()
        console.log('success')
    })
    })    
}

// const schema = mongoose.Schema
// const db = mongoose.connection
// db.on('err',console.error.bind(console,'connection error'))
// db.on('open',function(){
//     console.log('已连接')
// })
// const kittySchema = new schema({
//     name:String
// })
// kittySchema.methods.speak = function () {
//     var greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
//   }
// const Kitten = mongoose.model('Kitten',kittySchema)

// const Slience = new Kitten({name:'Slience'})
// Slience.save(function(err,doc){
//     if(err) console.error(err)
//     doc.speak()
// })