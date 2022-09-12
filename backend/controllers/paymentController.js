const {catchAsyncError} = require('../middleware/catchAsyncError')

const stripe = require('stripe')('sk_test_51Lg7JoEBYpZvykVXeutfYBCYm9Rx3OC7EEH0HpwrWL08Cba4gR8h8xFHEgYIhWYgglPgY7F40ii1UVhQ0vm4DQkw00R5bxf1Uh')


exports.processPayment = catchAsyncError(async(req, res ,next)=>{
    console.log(process.env.STRIPE_SECRET_KEY)

   try{
    const myPayment = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce"
        }
    })
    console.log("paymetn")
    res.status(200).json({success : true , client_secret : myPayment.client_secret})

   }catch(error){console.log(error)}
})

exports.sendStripeApiKey = catchAsyncError(async(req , res, next)=>{
    res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY})
})



exports.paymentSection=catchAsyncError(async(req , res , next)=>{
    try{
       const session = await stripe.checkout.sessions.create({
           line_items: [
             {
               price_data: {
                 currency: 'usd',
                 product_data: {
                   name: 'T-shirt',
                 },
                 unit_amount: 2000,
               },
               quantity: 1,
             },
           ],
           mode: 'payment',
           success_url: 'localhost:3000/success',
           cancel_url: 'localhost:3000/cart',
         });
    }catch(err){console.log(err.message)}
         console.log("khab didam")
   
         res.json({url : session.url});
      
   })