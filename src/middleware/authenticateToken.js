const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token is missing or invalid' });

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;

    // Role validation
    if (!['customer', 'business'].includes(user.role)) {
      return res.status(403).json({ message: 'Invalid role' });
    }

    next();
  });
};

module.exports = authenticateToken;
