console.log("Orders route loaded");

const express = require("express");
const router = express.Router();

const Order = require("../models/order");

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();

        res.json(orders);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE ORDER STATUS

router.put("/:id", async (req, res) => {

    try {

        const order =
        await Order.findByIdAndUpdate(

            req.params.id,

            {
                status:
                req.body.status
            },

            {
                new: true
            }

        );

        res.json(order);

    }

    catch(error) {

        res.status(500).json({

            message:
            error.message

        });

    }

});

module.exports = router;