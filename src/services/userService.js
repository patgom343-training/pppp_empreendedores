const { users } = require('../models/database');

const getUsers = () => {
  return users;
};

const addUser = (user) => {
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newId, createdAt: new Date(), ...user };
  users.push(newUser);
  return newUser;
};

module.exports = {
  getUsers,
  addUser
};
