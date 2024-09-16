const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)


module.exports = router;

