console.log("categories.js loaded");
const express = require("express");
const router = express.Router();

const Category = require("../models/category.js");
console.log(Category);
console.log(typeof Category);

// ===========================
// GET ALL CATEGORIES
// ===========================

router.get("/", async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ===========================
// GET SINGLE CATEGORY BY SLUG
// ===========================

router.get("/:slug", async (req, res) => {

    try {

        const category = await Category.findOne({
            slug: req.params.slug
        });

        if (!category) {

            return res.status(404).json({
                message: "Category not found"
            });

        }

        res.json(category);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ===========================
// CREATE CATEGORY
// ===========================

router.post("/", async (req, res) => {

    try {

        const category = new Category(req.body);

        await category.save();

        res.json(category);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ===========================
// UPDATE CATEGORY
// ===========================

router.put("/:id", async (req, res) => {

    try {

        const category =
        await Category.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(category);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ===========================
// DELETE CATEGORY
// ===========================

router.delete("/:id", async (req, res) => {

    try {

        await Category.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Category deleted"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;