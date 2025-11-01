const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

const { businesses } = require('../models/database');

router.get('/businesses', authenticateToken, (req, res) => {
  if (req.user.role !== 'cliente' && req.user.role !== 'empreendedor') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { name } = req.query;

  let results = businesses;

  if (name) {
    results = results.filter(business => business.name.toLowerCase().includes(name.toLowerCase()));
  }

  res.json(results);
});

module.exports = router;
