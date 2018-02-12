
var mongoose=require('mongoose');

require('dotenv').config({path : '/final/backend/.env'});




//testing


//database connection

module.exports.mongodb=function(){

    return new Promise((resolve,reject)=>{

mongoose.connect(process.env.name,function(err,res){
    if(err){
    reject(err);
}
    else{
    console.log("succesfully connected to the databse")
    resolve(res);
    }
})
})}

var val=process.env.value
console.log(val)

