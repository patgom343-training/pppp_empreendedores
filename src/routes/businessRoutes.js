const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createCategory, createBusiness, listCategories, listBusinesses } = require('../controllers/businessController');
const router = express.Router();

// Middleware to restrict access based on role
const restrictToBusiness = (req, res, next) => {
  if (req.user.role !== 'business') {
    return res.status(403).json({ message: 'Access restricted to business users only' });
  }
  next();
};

router.post('/categories', authenticateToken, restrictToBusiness, createCategory);
router.post('/businesses', authenticateToken, restrictToBusiness, createBusiness);
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
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const businesses = require('../models/database').businesses;
  const results = businesses.filter(business => business.name.toLowerCase().includes(name.toLowerCase()));

  res.json(results);
});
router.get('/', authenticateToken, listBusinesses);
router.put('/categories', authenticateToken, restrictToBusiness, (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: 'ID and name are required' });
  }

  const categories = require('../models/database').categories;
  const category = categories.find(cat => cat.id === id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  category.name = name;
  res.status(200).json({ message: 'Category updated successfully' });
});
router.delete('/categories', authenticateToken, restrictToBusiness, (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const categories = require('../models/database').categories;
  const categoryIndex = categories.findIndex(cat => cat.id === parseInt(id));

  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  categories.splice(categoryIndex, 1);
  res.status(200).json({ message: 'Category deleted successfully' });
});
router.put('/businesses', authenticateToken, restrictToBusiness, (req, res) => {
  const { id, name, category, description, isStarred } = req.body;

  if (!id || !name || !category) {
    return res.status(400).json({ message: 'ID, name, and category are required' });
  }

  const businesses = require('../models/database').businesses;
  const business = businesses.find(b => b.id === id);

  if (!business) {
    return res.status(404).json({ message: 'Business not found' });
  }

  business.name = name;
  business.category = category;
  if (description !== undefined) business.description = description;
  if (isStarred !== undefined) business.isStarred = isStarred;

  res.status(200).json({ message: 'Business updated successfully' });
});
router.delete('/businesses', authenticateToken, restrictToBusiness, (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const businesses = require('../models/database').businesses;
  const businessIndex = businesses.findIndex(b => b.id === parseInt(id));

  if (businessIndex === -1) {
    return res.status(404).json({ message: 'Business not found' });
  }

  businesses.splice(businessIndex, 1);
  res.status(200).json({ message: 'Business deleted successfully' });
});
router.get('/starred', authenticateToken, (req, res) => {
  const businesses = require('../models/database').businesses;
  const starredBusinesses = businesses.filter(business => business.isStarred);

  res.status(200).json(starredBusinesses);
});

module.exports = router;
