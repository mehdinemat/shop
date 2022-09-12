const express = require("express");

const router = express.Router()
const {createProduct , getAllProduct , updateProduct , deleteProduct , getProductDetails ,createProductReview ,getProductReviews ,deleteProductReview} = require('../controllers/ProductsController')
const {isAuthenticatedUser , authorizeRole} = require('../middleware/auth')
router.post('/products' ,createProduct )
router.get('/products', getAllProduct )
router.put('/products/:id' ,updateProduct)
router.delete('/products/:id' ,deleteProduct)
router.get('/products/:id',getProductDetails)
router.put('/review' , isAuthenticatedUser , createProductReview)
router.get('/reviews' , getProductReviews)
router.delete('/deletereviews' ,isAuthenticatedUser , deleteProductReview)
module.exports = router