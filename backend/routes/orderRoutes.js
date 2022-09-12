const router = require('express').Router();
const {newOrder , getSingleOrder, myOrders ,getAllOrders ,updateOrder ,deleteOrder} = require('../controllers/orderController')
const {isAuthenticatedUser , authorizeRole} = require('../middleware/auth')

router.post('/order/new' ,isAuthenticatedUser, newOrder)

router.get('/order/:id' , isAuthenticatedUser , getSingleOrder)
router.get('orders/me').get(isAuthenticatedUser , myOrders)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);
module.exports  =router