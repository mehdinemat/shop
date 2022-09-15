const express = require('express')
const app = express()
const Products  = require('./routes/productRoutes')
const errorMiddleWare = require('./middleware/error')
const User = require('./routes/userRoutes')
const Order = require('./routes/orderRoutes')
const Payment = require('./routes/paymentRoutes')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const forms = multer()
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')



    
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(fileupload())
app.use(cookieparser())



app.get('/' , (req, res)=>{ 
    app.use(express.static(path.resolve(__dirname , 'frontend' , 'build')))
    res.sendFile(path.join(__dirname , 'frontend' , 'build' , 'index.html') , function(err){ 
        if(err){
            res.status(500).send(err)
        }
    })
 })

app.use('/api/v1' ,Products )
app.use('/api/v1' ,User )
app.use('/api/v1' ,Order )
app.use('/api/v1' ,Payment )
app.use(errorMiddleWare)
module.exports = app 
 