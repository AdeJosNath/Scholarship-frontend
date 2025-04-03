const express = require('express');
const { 
    createScholarship, 
    getAllScholarships, 
    getScholarshipById, 
    updateScholarship, 
    deleteScholarship 
} = require('../controllers/scholarshipController');

const router = express.Router();

router.post('/', createScholarship);
router.get('/', getAllScholarships);
router.get('/:id', getScholarshipById);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

module.exports = router;