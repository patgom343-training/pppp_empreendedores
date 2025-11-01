const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createCategory, createBusiness, listCategories, listBusinesses } = require('../controllers/businessController');
const router = express.Router();

router.post('/categories', authenticateToken, createCategory);
router.post('/businesses', authenticateToken, createBusiness);
router.get('/categories', authenticateToken, listCategories);
router.get('/businesses', authenticateToken, listBusinesses);
router.get('/by-category', authenticateToken, (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  const businesses = require('../models/database').businesses;
  const results = businesses.filter(business => business.category.toLowerCase() === category.toLowerCase());

  res.json(results);
});
router.get('/by-name', authenticateToken, (req, res) => {
  console.log('Accessing /business/by-name'); // Log for debugging
  const { name } = req.query;

  if (!name) {
    console.log('Name parameter is missing'); // Log for debugging
    return res.status(400).json({ message: 'Name is required' });
  }

  const businesses = require('../models/database').businesses;
  const results = businesses.filter(business => business.name.toLowerCase().includes(name.toLowerCase()));

  console.log('Results:', results); // Log for debugging
  res.json(results);
});
router.get('/', authenticateToken, listBusinesses);

module.exports = router;
