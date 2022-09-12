const express = require('express')
const router = express.Router()
const {isAuthenticatedUser , authorizeRole} = require('../middleware/auth')
const {processPayment , sendStripeApiKey , paymentSection} = require('../controllers/paymentController')

router.route('/payment/process').post(isAuthenticatedUser , processPayment)
router.route('/stripeapikey').get(isAuthenticatedUser , sendStripeApiKey)
router.route('/create-checkout-session').post(paymentSection)
module.exports = router