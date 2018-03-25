const mongoose = require('mongoose')
const {get,post,put,controller} =require('../lib/decorator')
const { getAllMovies,
        getMovieDetail,
        getRelativeMovies
    } = require('../service/movie.js')
@controller('/api/v0/movies')
export class movieController {
    @get('/')
    async getMovie(ctx,next){
        const Movie = mongoose.model('Movie')
        const {type,year} = ctx.query
        const movies = await getAllMovies(type,year)
        ctx.body = {
            movies
        }
    }
    @get('/:id')
    async getMovieDetail(ctx,next){
        const id = ctx.params.id
        const movie = await getAllMovies(id)
        const getRelativeMovies = await getRelativeMovie(movie)
        ctx.body = {
           data:{
               movie,
               getRelativeMovies
           },
           success:true
        }
    }
}