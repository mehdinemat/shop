const mongoose  = require('mongoose')

const connectToDatabase = (req, res , next)=>{
    mongoose.connect(process.env.MONGO_URL , ()=>{
        console.log("we are connect to data base ")
    })
    
}

module.exports = connectToDatabase 