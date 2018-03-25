const mongoose = require('mongoose')
const schema = mongoose.Schema
const {Mixed,ObjectId} = schema.Types

const movieSchema = new schema({
    doubanId:{
        unique:true,
        type:String
    },
    rate:Number,
    title:String,
    video:String,
    summary:String,
    poster:String,
    cover:String,

    category:[{
        type:ObjectId,
        ref:'Category'
    }],

    videoKey:String,
    poster:String,
    coverKey:String,

    rawTitle:String,
    movieTypes:[String],
    pubdate:Mixed,
    year:Number,

    tags:Array,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})
movieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else{
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Movie',movieSchema)
