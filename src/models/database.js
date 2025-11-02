const users = [
  {
    id: 100,
    username: 'admin',
    password: 'admin123',
    role: 'business',
    email: 'admin@example.com',
    createdAt: new Date()
  }
];

const businesses = [
  {
    id: 1,
    name: 'Restaurante Saboroso',
    category: 'gastronomia',
        owner: 'admin',
    description: 'Um restaurante com pratos deliciosos.',
    products: [
      { id: 1, name: 'Feijoada Completa', price: 25.0, isStarred: true },
      { id: 2, name: 'Coxinha Gourmet', price: 5.0, isStarred: false }
    ],
    isStarred: false,
    contact: 'restaurante@example.com'
  },
  {
    id: 2,
    name: 'Artesanato Local',
    category: 'artesanato',
    owner: 'admin',
    description: 'Produtos artesanais feitos à mão.',
    products: [
      { id: 1, name: 'Vaso de Cerâmica', price: 40.0, isStarred: true },
      { id: 2, name: 'Cesta de Palha', price: 30.0, isStarred: false }
    ],
    isStarred: false,
    contact: 'artesanato@example.com'
  }
];

const categories = [
  {
    id: 1,
    name: 'gastronomia'
  },
  {
    id: 2,
    name: 'artesanato'
  },
  {
    id: 3,
    name: 'moda'
  }
];

module.exports = {
  users,
  businesses,
  categories
};
