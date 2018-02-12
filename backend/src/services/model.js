var mongoose=require('mongoose');

//schema design
var movieSchema=mongoose.Schema(
    {
     movieid:String,
     moviename:String,
     rating:String

    })

var movie= module.exports = mongoose.model("cinema",movieSchema);

//functionalities

module.exports.getMovies=async function(callback)
{
    await   movie.find(callback);
}

module.exports.addMovies=async function(newmovie,callback)
{
    await  movie.create(newmovie,callback);
}

module.exports.deleteMovie=async function(id,callback)
{
  await  movie.findByIdAndRemove(id,callback);
}

module.exports.updateMovie=async function(id,newmovie,callback)
{
    await  movie.findByIdAndUpdate(id,newmovie,callback);
}