const express = require("express");
const Product = require("../models/product");
const { protect , admin} = require("../middleware/authMiddleware");

const router = express.Router();


//@route POST /api/products
//@desc Create a new Product
// @access Private/ Admin

router.post("/", protect, admin, async(req, res) => {

    try{
        const {
            name,
            description,
            price, 
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku

        } = req.body;

        const product = new Product({
            name,
            description,
            price, 
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,

            user: req.user._id, //Refrence to the admin user who created it

        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
        
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@route PUT/api/products/:id
//@desc Update an existing product ID
// @access Private/Admin

router.put("/:id", protect, admin, async (req,res) => {

    try {
        const {
            name,
            description,
            price, 
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku

        } = req.body;

        //Find Product by ID
        const product = await Product.findById(req.params.id);

        if(product){
            //update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished: product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;
           

            // save the updated Product

            const updatedProduct = await product.save();
            res.json(updatedProduct);

        }
        else{
            res.status(404).json({ message : "Product not found"});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin

router.delete("/:id", protect, admin, async (req,res) => {
    try{
        //Find the product by ID
        const product = await Product.findById(req.params.id);

        if(product){

            //Remove the product from database

            await product.deleteOne();
            res.json({message : "Product removed"});
        }
        else{
            res.status(404).json({ message: "Product not found"});
        }
    } catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@route GET/api/products
//@desc Get all products with optional query filters
//@access Public

router.get("/", async(req,res) => {
    try{
        const {collection,
             size,
              color,
               gender,
                minPrice,
                 maxPrice,
                sortBy,
            search,
        category,
    material,
    brand,
    limit
} = req.query;

let query = {};

//Filter logic

if(collection && collection.toLocaleLowerCase() !== "all"){
    query.collections = collection;

}

if(category && category.toLocaleLowerCase() !== "all"){
    query.category = category;
}

if(brand){
    query.brand = { $in: brand.split(",")};
}

if(size){
    query.sizes = { $in: size.split(",")};
}

if(color){
    query.colors = { $in: [color]};
}

if(gender){
    query.gender = gender;
}

if(minPrice || maxPrice){
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
}

if(search) {
    query.$or = [
        { name: { $regex: search, $options: "i" }},
        { description: { $regex: search, $options: "i"}},
    ];
}


//sort logic

let sort = {}
if (sortBy) {
    switch(sortBy){
        case "priceAsc":
            sort = { price: 1};
            break;
            case "priceDesc":
                sort = {price:-1};
                break;
                case "popularity":
                    sort = {rating: -1};
                    break;
                    default:
                        break;
    }
}

// fetch products and apply sorting and limit
let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
res.json(products);

    } catch(error){
        console.error(error);
        res.status(500).send("server Error")
    }
});


//@route GET/api/products/best-seller
//@desc Retrives the product with highest rating
//@access public

router.get("/best-seller", async(req,res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1}); //sorts by rating in descending order.

        if(bestSeller){
            res.json(bestSeller);
        }
        else{
            res.status(404).json({ message: "No best seller found!!."})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
        
    }
});

//@route GET/api/products/new-arrivals
//@desc retrive latest 8 products - Creation date
//@access public

router.get("/new-arrivals", async(req,res) => {
    try {
        // ftech latest 8 products

        const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
        res.json(newArrivals);//fetch the most recently created products. & return only the latest 8 products.

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})



//@route GET /api/products/:id
// @desc Get a single product by ID
// @access public

router.get("/:id", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);

        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({ message: "Product not found"});
        }
    } catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});


//@route GET /api/products/similar/:id
//@desc Retrives similar products based on the current product's gender and category
//@access public

router.get("/similar/:id", async(req,res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({ message: "Product not found!"});
        }

        const similarProducts = await Product.find({
            _id: { $ne: id }, //Exclude the current product ID
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.json(similarProducts);
        
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
        
    }
});



module.exports = router;