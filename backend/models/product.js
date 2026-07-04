const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    gallery:{
        type:[String],
        default:[]
    },

    category:{
        type:String,
        required:true
    },

    stock:{
        type:Number,
        default:0
    },

    featured:{
        type:Boolean,
        default:false
    },

    newArrival:{
        type:Boolean,
        default:true
    },

    trending:{
        type:Boolean,
        default:false
    },

    bestSeller:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Product",
    productSchema
);