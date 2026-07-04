const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    banner: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Category", categorySchema);