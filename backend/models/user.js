const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:[true , 'نام کاربری را وارد کنید .'],
        maxlength:[30],
        minLength:[8]
    },
    email:{
        type:String , 
        required:[true , 'ایمیل را وارد کنید .'],
        unique:true , 
        validate:[validator.isEmail , 'ایمیل به طور صحیح وارد نشده']
    },password:{
        type:String , 
        required:[true , 'پسوورد را وارد کنید.'],
        minLength:[6],
        select:false
    },
    avatar:{
        public_id:{
            type:String , 
            required:true
        },url:{
            type:String , 
            required:true
        }
    },role:{
        type:String ,
        default:'user'
    },   resetPasswordExpire :{
         type:Date
        },
    resetPasswordToken : String , 
 
})
    userSchema.pre('save' ,async function(next){
        if(!this.isModified("password"))
        {
            next()
        }
     this.password = await bcrypt.hash(this.password , 10)
    })
    userSchema.methods.getJWTTOKEN = function(){
        return jwt.sign({id:this._id} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRE})
    }
    userSchema.methods.comparePassword =async function(password){
        return await bcrypt.compare(password , this.password)
    }
    userSchema.methods.getResetPasswordToken = function(){
        const resetToken = crypto.randomBytes(20).toString("hex")
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
        this.resetPasswordExpire = Date.now() + 60 * 15*1000;
        return resetToken
    }
module.exports = mongoose.model('user' ,userSchema )