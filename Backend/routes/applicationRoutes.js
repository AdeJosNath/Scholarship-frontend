const express = require('express');
const app = express()

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

app.delete("/api/applications/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("applications")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.json({ message: "Application withdrawn successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
