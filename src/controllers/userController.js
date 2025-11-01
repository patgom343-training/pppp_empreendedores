const { getUsers } = require('../services/userService');

const listUsers = (req, res) => {
  try {
    const users = getUsers().map(user => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listUsers
};
