import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsPage = () => {
  // State to store all product details in one object
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing product
      try {
        await axios.put(`http://localhost:5000/products/${productId}`, productDetails);
        fetchProducts();
        resetForm();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Create new product
      try {
        await axios.post("http://localhost:5000/products", productDetails);
        fetchProducts();
        resetForm();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setProductDetails({
      name: product.name,
      price: product.price,
      category: product.category
    });
    setProductId(product._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setProductDetails({
      name: "",
      price: "",
      category: ""
    });
    setProductId(null);
    setIsEditing(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Products Management</h1>

      {/* Form for creating or updating products */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={productDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={productDetails.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Product category"
          value={productDetails.category}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.category}{" "}
            <button onClick={() => handleEdit(product)}>Edit</button>{" "}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
