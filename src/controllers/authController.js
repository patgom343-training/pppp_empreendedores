const { registerUser, loginUser } = require('../services/authService');

const register = (req, res) => {
  const { username, password, role } = req.body;
  try {
    registerUser(username, password, role);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = loginUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
