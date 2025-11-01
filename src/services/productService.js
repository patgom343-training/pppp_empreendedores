const { businesses } = require('../models/database');

const addProduct = (businessId, product) => {
  const business = businesses.find(b => b.id === businessId);
  if (!business) {
    throw new Error('Business not found');
  }

  const productId = business.products.length + 1;
  const newProduct = { id: productId, ...product };
  business.products.push(newProduct);
};

const getProducts = () => {
  return businesses.flatMap(business => business.products || []);
};

module.exports = {
  addProduct,
  getProducts
};
