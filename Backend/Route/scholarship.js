const express = require('express');
const router = express.Router();
const { 
    getAllScholarships, 
    createScholarship, 
    updateScholarship, 
    deleteScholarship,
    searchScholarships
} = require('../controllers/scholarshipController');
const { authenticateAdmin } = require('../middleware/authmiddleware');

// GET all scholarships
router.get('/', authenticateAdmin, getAllScholarships);

// CREATE a new scholarship
router.post('/', authenticateAdmin, createScholarship);

// SEARCH scholarships
router.get('/search', authenticateAdmin, searchScholarships);

// UPDATE a scholarship
router.put('/:id', authenticateAdmin, updateScholarship);

// DELETE a scholarship
router.delete('/:id', authenticateAdmin, deleteScholarship);

module.exports = router;