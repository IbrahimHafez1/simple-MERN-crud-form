const Product = require("../models/product.model");


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ deleted: false });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { deleted: true }, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct }