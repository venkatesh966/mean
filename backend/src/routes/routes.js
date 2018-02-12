var express=require('express');
var router = express.Router();
var fs = require('fs');
let wri= fs.createWriteStream("out.txt");
var app=express();
//importing model
var movie=require('../services/model.js');


//defining routes

router.get('/', function(req,res){

  movie.getMovies( function(err,data){
      if(err) throw err;
       res.json(data)
      console.log(data)
      wri.write(JSON.stringify(data)+"\n");
     
  }) 
   
 
})
console.log("I am in routes file")
router.post('/',async function(req,res){
    if(req.body.movieid&&req.body.moviename&&req.body.rating){
        var newmovie={
            movieid:req.body.movieid,
            moviename:req.body.moviename,
            rating:req.body.rating
        } 
    }
    if(req.query.movieid&&req.query.moviename&&req.query.rating)
    {
        var newmovie={
            movieid:req.query.movieid,
            moviename:req.query.moviename,
            rating:req.query.rating
        }
    }

   
  //  var newmovie={
   //     movieid:req.body.movieid,
    //    moviename:req.body.moviename,
     //   rating:req.body.rating
//    }
  await  movie.addMovies(newmovie, function(err,data){
        if(err) throw err;
        res.json(data)
        console.log(data)
        wri.write(JSON.stringify(data)+"\n");
       
    })
     var readStream = fs.createReadStream("out.txt");
        readStream.pipe(res);


})

router.delete('/:_id',async function(req,res){
  
   await movie.deleteMovie(req.params._id,function(err,data){
        if(err) throw err;
        res.json(data);
    })


})

router.put('/:_id',async function(req,res){
    if(!req.body.movieid||!req.body.moviename||!req.body.rating||isNan(req.params._id))
    {
        var result=new Error();
    }
    else{
    var newmovie={
        movieid:req.body.movieid,
        moviename:req.body.moviename,
        rating:req.body.rating
    }
  await  movie.updateMovie(req.params._id,newmovie,function(err,data){
        if(err) throw err;
        res.json(data); 
        wri.write(JSON.stringify(data)+"\n");
    })
}
if(result instanceof Error)
{
    console.log("Error has occured")
}
})

module.exports=router