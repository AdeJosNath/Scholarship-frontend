const express = require('express');
const { getAdminDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, getAdminDashboard);

module.exports = router;
