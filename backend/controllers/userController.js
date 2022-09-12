const User = require('../models/user')
const {catchAsyncError} = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const jwttoken = require('../utils/jwttoken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const user = require('../models/user');
const cloudinary  =require('cloudinary')


exports.registeruser =catchAsyncError(async (req ,res , next)=>{

   
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar ,{
        folder: "avatars",
        width: 150,
        crop: "scale",
      }  , (error , result)=>{
          
      })
      
    
    const {name , email , password } = req.body ; 
    const user =await User.create({
        name , email , password , 
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
    if(!user){
        res.status(500).json("fail in create user ")
    }
    const token  = user.getJWTTOKEN();
   
    res.status(200).json({msg:"user aded in db" , user , token})
})
exports.loginuser =async (req , res , next)=>{
    const {email , loginPassword} = req.body ;
    const user =await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler("user login not found " , 401))
    }
   

    const comparePassword =await user.comparePassword(loginPassword)
    if(!comparePassword){
        return next(new ErrorHandler("password or email is incorrect" , 401))
    }
    user.getResetPasswordToken()
    jwttoken(user , 200 , res)

}
exports.logout = catchAsyncError((req ,res ,next)=>{
    res.cookie("token" , null , {expires:  new Date(Date.now()), httpOnly:true} )
    res.status(200).json({success:true , message:"log out"})
})

exports.forgotPassword =async (req, res , next)=>{

    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found " , 404))
    }
    const resetToken = user.getResetPasswordToken();

   await user.save({validateBeforeSave:false})
   console.log(resetToken)
   console.log(`${req.protocol}://${req.get("host")}/api/v1/reset/password/${resetToken}`)
   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

   const message =`your password token is :-\n\n ${resetPasswordUrl}`

    try{

        await sendEmail({
            email:user.email ,
            subject:'shop password recovery',
            message
        })
        res.status(200).json({
            success:true , message:`Email sent to ${user.email} successfully`
        })

    }catch(err){
        // user.resetPasswordToken = undefined;
        // user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(err.message , 500))
    }

}
exports.resetPassword = async(req , res , next)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({resetPasswordToken , resetPasswordExpire:{$gt:Date.now()}})

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesnt match" , 400))
    }

    user.password = user.password  ; 
    user.resetPasswordExpire= undefined ; 
    user.resetPasswordToken = undefined;
    await user.save();
    jwttoken(user , 200 , res)

}

exports.getUserDetails =async (req, res , next)=>{

    const userDetails = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        userDetails
    })
}

exports.updatePasswordd = async(req, res, next)=>{
    
    const user = await User.findById(req.user.id).select('+password')

   
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    console.log(isPasswordMatched)
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect" , 400))
    }

    
    
 
    if(req.body.newPassword !== req.body.confirmNewPassword){
        return next(new ErrorHandler("password does not match" , 400))
    }
    console.log("we are here")
    user.password = req.body.newPassword 
    await user.save()

    res.status(200).json({
        success:true,
        user
    })
    jwttoken(user , 200 , res)
}

exports.updateProfile = async(req, res ,next) =>{

  
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar ,{
            folder: "avatars",
            width: 150,
            crop: "scale",
          }  , (error , result)=>{
              
          })
          
        const newUserData ={
            name:req.body.name,
            email:req.body.email,  avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
       
      
    
        const user  = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new:true , 
            runValidators:true , 
            useFindAndModify:false
        })
        console.log(user)
        res.status(200).json({success:true})
    }



exports.getAllUsers = async(req, res , next)=>{

    const user = await User.find();

    res.status(200).json({success:true , user})

}

exports.getSingleUser=  async(req , res ,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user not found ${req.params.id}` , 400))
    }

    res.status(200).json({
        success:true,
        user
    })
}

exports.updateUserRole =async (req, res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
      });

}

exports.deleteUser =async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  };