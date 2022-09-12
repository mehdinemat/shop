const Product =require('../models/product')
const {catchAsyncError} = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')
const apiFeatures = require('../utils/apiFeatures')

exports.getAllProduct=catchAsyncError(async (req, res , next)=>{
    const numberOfPerPage = 5
    const productCount = await Product.countDocuments()
    const apifeatures = new apiFeatures(Product.find() , req.query).search().filter();
    const products = apifeatures.query;
    const countAllOfProducts = products.length;
    apifeatures.pagination(numberOfPerPage)
     product = await apifeatures.query
    if(!product){
       return next(new ErrorHandler("product not found !" , 401))
    }
    res.status(200).json({msg:"information recived " , product ,productCount ,numberOfPerPage, countAllOfProducts})

})

exports.createProduct =catchAsyncError(async (req, res, next)=>{
 
    const product =await Product.create(req.body)
    if(!product){
       return next(new ErrorHandler("product not found " , 401))
    }
    res.status(200).json("data sended")
})
exports.updateProduct =catchAsyncError(async(req, res , next)=>{
    const productupdated  =await Product.findByIdAndUpdate(req.params.id  ,req.body , {new:true , runValidators:true , useFindAndModify:false})
    if(!productupdated)
    {
        res.status(500).json("error to find and update product")
    }
    res.status(200).json({msg:"product updated" , productupdated})
}) 
exports.deleteProduct =catchAsyncError(async(req, res , next)=>{
    const deleteProduct = await Product.findById(req.params.id)
    if(!deleteProduct){
        res.status(500).json("product not found")
    }
    await deleteProduct.remove()
    res.status(200).json({msg:"product deleted"})
}) 
exports.getProductDetails =catchAsyncError(async(req, res, next)=>{
    const productDetails=  await Product.findById(req.params.id)
    if(!productDetails){
      return  next( new ErrorHandler("product not found" , 500))
    }
    res.status(200).json({msg:"product founded" , productDetails})
}) 

exports.createProductReview =async (req ,res ,next)=>{

    const {product_id , comment , rating} = req.body;

    const review = {
        comment , 
        rating:Number(rating),
        user:req.user._id,
        name:req.user.name
    }

    const product = await Product.findById(product_id)

  const isReviewd = product.reviews.find(rev=> rev.user.toString() === req.user._id.toString() )

  if(isReviewd)
  {
      product.reviews.forEach((rev)=> {
          if(rev.user.toString() === req.user._id.toString())
          {
            rev.comment = comment , rev.rating = rating
          }
      } )
  }else {
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length;
  }

  let avg = 0
  product.reviews.forEach((rev)=>{
    avg += rev.rating ; 
  })

  const productRating = avg / product.reviews.length;
  await product.save({validateBeforSave:false})


  res.status(200).json({
    success: true,
  });

}

exports.getProductReviews =async (req, res , next)=>{
    const product = await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler("product not found " , 404))
    }
    res.status(200).json({
        status:true,
        reviews:product.reviews
    })
}

exports.deleteProductReview = async(req ,res , next)=>{

    const product = await Product.findById(req.query.product_id)

    if(!product){
        return next(new ErrorHandler("product not found " , 404))
    }
    
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0 ;
  reviews.forEach((rev)=>{
      avg += rev.rating
  })

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
  
}