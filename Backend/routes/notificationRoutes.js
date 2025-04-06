const express = require('express');
const { 
    createNotification, 
    getAllNotifications, 
    getUserNotifications, 
    markNotificationAsRead, 
    deleteNotification 
} = require('../controllers/notificationController');

const router = express.Router();

router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/:user_id', getUserNotifications);
router.put('/:id', markNotificationAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;

app.get("/api/notifications", async (req, res) => {
    try {
        const { data, error } = await supabase.from("notifications").select("*");
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
