const ErrorHandler  =require('../utils/errorhandler')
module.exports = (err , req ,res, next)=>{
    
    err.message = err.message || "this is interval error"
    err.statuscode = err.statuscode || 500 
    if(err.name === "CastError"){
        message = `resource not found . ${err.path}`
       err =   new ErrorHandler(message , 400)
    }
    if(err.code === 11000){

        const message = `Duplicate ${Object.keys(err.keyPattern)} Entered`;
        err= new ErrorHandler(message , 400)
    }
    res.status(err.statuscode).json({msg:err.message , status:err})
}