const ErrorHandler = require("../utils/errorHandler")
const jwt = require('jsonwebtoken')
const User =require('../models/user')

exports.isAuthenticatedUser = async(req, res ,next)=>{
   

    const {token} = req.cookies
   
    if(!token){
        return next(new ErrorHandler("resource not Found!" , 401))
    }
    const decodedata = jwt.verify(token  , process.env.JWT_SECRET)
     req.user =await User.findById(decodedata.id)
    next()

}
exports.authorizeRole = (...roles)=>(req , res, next)=>{
    if(!roles.includes(req.user.role)){return next(new ErrorHandler(`Role ${req.user.role} not alowed to acces this resource` , 403))}
    next()
}