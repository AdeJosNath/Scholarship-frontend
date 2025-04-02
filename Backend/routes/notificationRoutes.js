// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllNotifications, 
    markAsRead, 
    markAllAsRead,
    createNotification
} = require('../controllers/notificationController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// GET all notifications for the authenticated user
router.get('/', authenticateAdmin, getAllNotifications);

// MARK a notification as read
router.put('/:id/read', authenticateAdmin, markAsRead);

// MARK all notifications as read
router.put('/read-all', authenticateAdmin, markAllAsRead);

// CREATE a new notification
router.post('/', authenticateAdmin, createNotification);

module.exports = router;