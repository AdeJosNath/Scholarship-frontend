const Notification = require('../models/notificationModel');

exports.createNotification = async (req, res) => {
    try {
        const { user_id, message, type } = req.body;
        const notification = await Notification.createNotification(user_id, message, type);
        res.status(201).json({ message: 'Notification sent successfully', notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const { user_id } = req.params;
        const notifications = await Notification.getUserNotifications(user_id);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.markNotificationAsRead(id);
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.deleteNotification(id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};