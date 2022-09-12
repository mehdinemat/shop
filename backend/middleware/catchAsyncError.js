const ErrorHandler = require('../utils/errorHandler')
exports.catchAsyncError = (func)=>(req, res, next)=>{
console.log('aimmmmm')
    Promise.resolve(func(req, res, next)).catch(next)

}