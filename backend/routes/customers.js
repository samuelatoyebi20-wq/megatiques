const express =
require("express");

const router =
express.Router();

const Customer =
require("../models/customer");

router.get(
"/",
async (req, res) => {

    const customers =
    await Customer.find();

    res.json(customers);

});

router.post(
"/",
async (req, res) => {

    const customer =
    await Customer.create(
        req.body
    );

    res.json(customer);

});

module.exports =
router;