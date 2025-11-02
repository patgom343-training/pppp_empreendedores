const { businesses } = require('../models/database');

const addProduct = (businessId, product) => {
  const business = businesses.find(b => b.id === businessId);
  if (!business) {
    throw new Error(`Business with ID ${businessId} not found. Please register the business first.`);
  }

  const productId = business.products.length + 1;
  const newProduct = { id: productId, ...product };
  business.products.push(newProduct);
};

const getProducts = () => {
  return businesses.flatMap(business => business.products || []);
};

const deleteProduct = (businessId, productId) => {
  const business = businesses.find(b => b.id === businessId);
  if (!business) {
    throw new Error(`Business with ID ${businessId} not found.`);
  }

  const productIndex = business.products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    throw new Error(`Product with ID ${productId} not found in business ${businessId}.`);
  }

  business.products.splice(productIndex, 1);
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct
};
