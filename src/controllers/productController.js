const { addProduct, getProducts } = require('../services/productService');

const createProduct = (req, res) => {
  const { businessId, name, price, isStarred } = req.body;
  try {
    addProduct(businessId, { name, price, isStarred });
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listProducts = (req, res) => {
  try {
    const products = getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  listProducts
};
