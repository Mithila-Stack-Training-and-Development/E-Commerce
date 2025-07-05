const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MOngoDb Connected Successfully!!");
    }
    catch(error){
        console.error("MongoDb Connection failed.", err)
    }
};
module.exports = connectDB;