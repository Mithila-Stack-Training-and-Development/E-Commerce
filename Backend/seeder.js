const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.js");
const user = require("./models/user.js");
const cart = require("./models/cart.js");
const products = require("./data/product.js");

dotenv.config();

//Connect to mongoDB

mongoose.connect(process.env.MONGO_URI);

//function to seed data

const seedData = async () => {
    try{
        //clear existing data
        await Product.deleteMany();
        await user.deleteMany();
        await cart.deleteMany();

        //create a default admin user
        const createdUser = await user.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        // Assign the default user ID to each product

        const userID = createdUser._id;
        const sampleProducts = products.map((product) => {
            return {...product, user:userID};
        });

        //insert the products into the database
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully");
        process.exit();
    }catch(error){
        console.error("Error seeding the data: ", error);
        process.exit(1);
    }
};

seedData();
