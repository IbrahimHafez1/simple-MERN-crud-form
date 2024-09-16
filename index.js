const express = require("express");
const app = express();
const port = 5000;
const productRoutes = require("./routes/product.route");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/products", {
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
