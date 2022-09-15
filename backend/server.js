const app = require('./app')
const dotenv = require('dotenv')
const connectToDatabase = require('./config/database')
const cloudinary = require('cloudinary')

dotenv.config({path:"backend/config/config.env"})


//example you create a value but is not in the code
process.on('uncaughtException' , (err)=>{

    console.log(`${err.message}`)
    server.close(()=>{
        process.exit(1)
    })

})

connectToDatabase()


const port = process.env.PORT || 3000;

const server = app.listen(port , ()=>{
    console.log("we are connect to server")
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
     api_key : process.env.API_KEY,
     api_secret:process.env.API_SECRET
 })

process.on('unhandledRejection' , (err)=>{
    console.log(`${err.message}error server , shut off the server`)
    server.close()
})