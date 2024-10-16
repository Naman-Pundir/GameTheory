const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
    try{
        await mongoose.connect(DATABASE_URL);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;