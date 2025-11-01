const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { listUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', authenticateToken, listUsers);

module.exports = router;
