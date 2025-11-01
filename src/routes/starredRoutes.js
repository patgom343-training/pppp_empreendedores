const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();
const { businesses } = require('../models/database');

router.get('/starred', authenticateToken, (req, res) => {
  if (req.user.role !== 'cliente' && req.user.role !== 'empreendedor') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const starredBusinesses = businesses.filter(business => business.isStarred);
  res.json(starredBusinesses);
});

module.exports = router;
