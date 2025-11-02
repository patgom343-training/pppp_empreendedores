const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createProduct, listProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', authenticateToken, listProducts);
router.get('/by-name', authenticateToken, (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const products = require('../models/database').businesses.flatMap(business => business.products);
  const results = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));

  res.json(results);
});
router.put('/', authenticateToken, (req, res) => {
  const { id, businessId, name, price, isStarred } = req.body;

  if (!id || !businessId || !name || !price) {
    return res.status(400).json({ message: 'ID, businessId, name, and price are required' });
  }

  const businesses = require('../models/database').businesses;
  const business = businesses.find(b => b.id === businessId);

  if (!business) {
    return res.status(404).json({ message: 'Business not found' });
  }

  const product = business.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = name;
  product.price = price;
  if (isStarred !== undefined) product.isStarred = isStarred;

  res.status(200).json({ message: 'Product updated successfully' });
});
router.delete('/', authenticateToken, (req, res) => {
  const { id, businessId } = req.query;

  if (!id || !businessId) {
    return res.status(400).json({ message: 'ID and businessId are required' });
  }

  const businesses = require('../models/database').businesses;
  const business = businesses.find(b => b.id === parseInt(businessId));

  if (!business) {
    return res.status(404).json({ message: 'Business not found' });
  }

  const productIndex = business.products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  business.products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
});
router.get('/starred', authenticateToken, (req, res) => {
  const products = require('../models/database').businesses.flatMap(business => business.products);
  const starredProducts = products.filter(product => product.isStarred);

  res.status(200).json(starredProducts);
});

module.exports = router;
