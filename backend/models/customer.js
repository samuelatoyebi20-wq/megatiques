const mongoose = require("mongoose");

const customerSchema =
new mongoose.Schema({

    fullName: String,

    email: String,

    phone: String,

    address: String,

    city: String,

    state: String

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "Customer",
    customerSchema
);