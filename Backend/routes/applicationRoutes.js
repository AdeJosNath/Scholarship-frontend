// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllApplications, 
    getApplicationById,
    updateApplicationStatus,
    searchApplications
} = require('../controllers/applicationController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authenticateAdmin);

// GET all applications
router.get('/', getAllApplications);

// GET single application by ID
router.get('/:id', getApplicationById);

// SEARCH applications
router.get('/search', searchApplications);

// UPDATE application status
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;