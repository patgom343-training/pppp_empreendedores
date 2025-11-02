const { categories, businesses } = require('../models/database');

const addCategory = (name) => {
  if (categories.some(category => category.name === name)) {
    throw new Error('Category already exists');
  }
  const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
  const newCategory = { id: newId, name };
  categories.push(newCategory);
};

const addBusiness = (name, category, owner, description, productIds = [], isStarred = false) => {
  if (!categories.some(cat => cat.name === category)) {
    throw new Error(`Category '${category}' not found. Please register the category first.`);
  }

  const products = require('../models/database').products;
  const associatedProducts = productIds.map(id => {
    const product = products.find(prod => prod.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  });

  const newId = businesses.length > 0 ? businesses[businesses.length - 1].id + 1 : 1;
  const newBusiness = { id: newId, name, category, owner, description, products: associatedProducts, isStarred };
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
