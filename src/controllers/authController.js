const { registerUser, loginUser } = require('../services/authService');

const register = (req, res) => {
  const { username, password, role } = req.body;

  // Validate role
  if (!['customer', 'business'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Allowed roles are customer and business.' });
  }

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
