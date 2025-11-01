const jwt = require('jsonwebtoken');
const { addUser } = require('./userService');
const { users } = require('../models/database');

const registerUser = (username, password, role) => {
  if (users.find(user => user.username === username)) {
    throw new Error('User already exists');
  }
  addUser({ username, password, role });
  //console.log('User registered:', { username, password, role }); // Debugging log
};

const loginUser = (username, password) => {
  //console.log('Attempting login for:', { username, password }); // Debugging log
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
};

module.exports = {
  registerUser,
  loginUser
};
