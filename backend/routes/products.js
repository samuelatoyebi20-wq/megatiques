console.log("Products route loaded");

const express = require("express");
const router = express.Router();

const Product = require("../models/product");


// ============================
// GET ALL PRODUCTS
// ============================

router.get("/", async (req, res) => {

    try {

        const products = await Product.find()
        .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch products"
        });

    }

});


// ============================
// GET SINGLE PRODUCT
// ============================

router.get("/:id", async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if(!product){

            return res.status(404).json({
                message:"Product not found"
            });

        }

        res.json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:"Failed to fetch product"
        });

    }

});


// ============================
// ADD PRODUCT
// ============================

router.post("/", async (req, res) => {

    try {

        const product = new Product({

            name:req.body.name,

            price:req.body.price,

            description:req.body.description,

            image:req.body.image,

            gallery:req.body.gallery || [],

            category:req.body.category,

            stock:req.body.stock,

            featured:req.body.featured || false,

            newArrival:req.body.newArrival ?? true,

            trending:req.body.trending || false,

            bestSeller:req.body.bestSeller || false

        });

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:"Failed to add product"
        });

    }

});


// ============================
// UPDATE PRODUCT
// ============================

router.put("/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );

        if(!product){

            return res.status(404).json({
                message:"Product not found"
            });

        }

        res.json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:"Failed to update product"
        });

    }

});


// ============================
// DELETE PRODUCT
// ============================

router.delete("/:id", async (req, res) => {

    try {

        const product =
        await Product.findByIdAndDelete(
            req.params.id
        );

        if(!product){

            return res.status(404).json({
                message:"Product not found"
            });

        }

        res.json({

            message:"Product Deleted Successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:"Failed to delete product"
        });

    }

});


module.exports = router;