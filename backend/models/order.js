const mongoose = require("mongoose");

const orderSchema =
new mongoose.Schema({

    customerName: String,

    email: String,

    phone: String,

    address: String,

    items: Array,

    total: Number,

    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "Order",
    orderSchema
);