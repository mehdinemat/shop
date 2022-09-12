const jwtToken = (user , statuscode , res)=>{
    const options={
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 24 * 1000),
        httpOnly:true
    }
    const token = user.getJWTTOKEN()

   console.log(token)
    res.status(statuscode).cookie("token", token , options).json({
        success:true , 
        user , 
        token
        
    })
    console.log("jwt is ready")
    
}
module.exports = jwtToken