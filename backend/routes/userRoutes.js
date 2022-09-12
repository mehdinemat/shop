const router = require('express').Router()
const {registeruser , loginuser , logout ,updateProfile, forgotPassword , resetPassword , getUserDetails ,updatePasswordd , getSingleUser , getAllUsers , updateUserRole , deleteUser} = require('../controllers/userController')
const {isAuthenticatedUser , authorizeRole} = require('../middleware/auth')
router.put('/me/update' , isAuthenticatedUser , updateProfile)
router.post('/registeruser' , registeruser);
router.post('/loginuser' ,loginuser);
router.get('/logout' , logout);
router.post('/password/forgot' , forgotPassword);
router.put('/password/reset/:token' ,resetPassword);
router.get('/me' ,isAuthenticatedUser , getUserDetails )

router.put('/password/update' , isAuthenticatedUser , updatePasswordd );
router.get('/admin/users'   ,isAuthenticatedUser , authorizeRole("admin") , getAllUsers);
router.get('/admin/user/:id' ,isAuthenticatedUser , authorizeRole("admin") , getSingleUser);
router.put('/admin/user/:id' ,isAuthenticatedUser , authorizeRole("admin") , updateUserRole);
router.delete('/admin/user/:id' ,isAuthenticatedUser , authorizeRole("admin") , deleteUser);
module.exports = router