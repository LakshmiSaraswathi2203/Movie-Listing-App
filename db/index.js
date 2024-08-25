const mongoose = require('mongoose');
const connectDB = async()=>
{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongoose connected');
    }
    catch(err)
    {
        console.log('mongoDB connection failed');
        throw err;
    }
}

module.exports = connectDB;
//default export