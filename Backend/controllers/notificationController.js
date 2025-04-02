// controllers/notificationController.js
const supabase = require('../config/supabaseClient');

exports.getAllNotifications = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { data, error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', id)
            .eq('user_id', req.user.id)
            .select();
        
        if (error) throw error;
        
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAllAsRead = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', req.user.id)
            .eq('read', false)
            .select();
        
        if (error) throw error;
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const { message, user_id } = req.body;
        
        const { data, error } = await supabase
            .from('notifications')
            .insert([
                { 
                    message,
                    user_id,
                    read: false,
                    created_at: new Date().toISOString()
                }
            ])
            .select();
        
        if (error) throw error;
        
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};