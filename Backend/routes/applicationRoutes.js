const express = require('express');
const { 
    createApplication, 
    getAllApplications, 
    getApplicationById, 
    updateApplication, 
    deleteApplication 
} = require('../controllers/applicationController');

const router = express.Router();

router.post('/', createApplication);
router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
