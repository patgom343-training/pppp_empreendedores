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

module.exports = router;
