const { categories, businesses } = require('../models/database');

const addCategory = (name) => {
  if (categories.some(category => category.name === name)) {
    throw new Error('Category already exists');
  }
  const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
  const newCategory = { id: newId, name };
  categories.push(newCategory);
};

const addBusiness = (name, category, owner) => {
  if (!categories.some(cat => cat.name === category)) {
    throw new Error('Invalid category');
  }
  const newId = businesses.length > 0 ? businesses[businesses.length - 1].id + 1 : 1;
  const newBusiness = { id: newId, name, category, owner, products: [] };
  businesses.push(newBusiness);
};

const getCategories = () => {
  return categories;
};

module.exports = {
  addCategory,
  addBusiness,
  getCategories
};
