const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        default: 0,
    },
    category: {
        type: String,
    },
    deleted: {
        type: Boolean,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product