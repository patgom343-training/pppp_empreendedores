const { addCategory, addBusiness, getCategories } = require('../services/businessService');

const createCategory = (req, res) => {
  const { name } = req.body;
  try {
    addCategory(name);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const createBusiness = (req, res) => {
  const { name, category, description, productIds = [], isStarred, contact } = req.body;
  try {
    addBusiness(name, category, req.user.username, description, productIds, isStarred, contact);
    res.status(201).json({ message: 'Business registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listCategories = (req, res) => {
  try {
    const categories = getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listBusinesses = (req, res) => {
  try {
    const businesses = require('../models/database').businesses.map(business => ({
      id: business.id,
      name: business.name,
      category: business.category,
      owner: business.owner,
      description: business.description,
      products: business.products,
      isStarred: business.isStarred,
      contact: business.contact
    }));
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  createBusiness,
  listCategories,
  listBusinesses
};
