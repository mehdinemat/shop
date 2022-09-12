const mongoose  =require('mongoose')

const productSchema =new mongoose.Schema({
        name:{
            type:String, 
             required:[true , "نام کالا باید وارد شود ."]
        },
        description:{
            type:String ,
            required:[true , "توضیحات کالا باید وارد شود ."],

        },
        price:{
            type:Number , 
            required:[true , "قیمت کالا باید وارد شود ."],
            maxLength:[15]
        },
        rating:{
            type:Number , 
            default:0
        },
        image:[
            {
            public_id:{
                type:String , 
                required:true
            },
            url:{
                type:String ,
                required:true
            }
        }
        ],
        category:{
            type:String , 
            required:[true , "دسته کالا باید مشخص شود . "]
        },
        stock:{
            type:Number , 
            required:[true , "موجودی کالا را مشخص کنید . "],
            maxLength:[4],
            default:1
        },
        numOfReviews:{
            type:Number , 
            default:0
        },
       
        reviews:[
          { 
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
               name:{
                type:String , 
                required:true
            },rating:{
                type:Number ,
                required:true 
            },comment:{
                type:String , 
                required:true
            }}
        ]


})

module.exports = mongoose.model("Product" , productSchema)