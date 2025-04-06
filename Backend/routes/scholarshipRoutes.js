const express = require('express');
const app = express()

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

app.get("/api/scholarships", async (req, res) => {
    try {
        let query = supabase.from("scholarships").select("*");

        if (req.query.keyword) {
            query = query.ilike("title", `%${req.query.keyword}%`);
        }
        if (req.query.category) {
            query = query.eq("category", req.query.category);
        }
        if (req.query.deadline) {
            query = query.lte("deadline", req.query.deadline);
        }

        const { data, error } = await query;
        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});