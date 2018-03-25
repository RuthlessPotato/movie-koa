

const qiniu = require('qiniu')
const nanoid = require('nanoid')
const cfg = require('./config/index.js')
const accessKey = cfg.qiniu.AK
const secretKey = cfg.qiniu.SK
const bucket = cfg.qiniu.bucket
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
console.log(mac)
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2
var bucketManager = new qiniu.rs.BucketManager(mac, config);

const uploadToQiniu = async (url,key) => {
  return  new Promise((resolve,reject) => {
    bucketManager.fetch(url,bucket,key ,(err,ret,info) =>{
        if(err){
            reject(err)
        }else{
            if(info.statusCode === 200){
                resolve({key})
            }else{
                reject(info)
            }
        }
    })
 })
}
;(async () =>{
    let movies = [
        { doubanId: 26384741,
            title: '湮灭',
            rate: 7.4,
            video: 'http://vt1.doubanio.com/201803211712/9133246b29efb2d6903a4684921106a7/view/movie/M/302280920.mp4',
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2516914607.jpg',
            cover: 'https://img1.doubanio.com/img/trailer/medium/2516927718.jpg?1521617838'
        }
            
    ]
    movies.map(async (movie) =>{
        console.log('正在传')
        if(movie.video && !movie.key){
            try{
                let videoData = await uploadToQiniu(movie.video,nanoid()+'.mp4')
                console.log('正在传 video')
                let posterData = await uploadToQiniu(movie.poster,nanoid()+'.jpg')
                console.log('正在传 poster')
                let coverData = await uploadToQiniu(movie.cover,nanoid()+'.jpg')
                console.log('正在传 cover')
                if(videoData.key){
                    movie.videoKey = videoData.key
                }
                if(posterData.key){
                    movie.posterKey = posterData.key
                }
                if(coverData.key){
                    movie.coverKey = coverData.key
                }
                console.log(movie)
            }catch(err){
                console.log(err)
                
            }           
        }
    })
})()