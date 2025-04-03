const supabase = require('../config/supabaseClient');

const Notification = {
    async createNotification(user_id, message, type = 'general') {
        const { data, error } = await supabase.from('notifications').insert([{ 
            user_id, message, type, read_status: false 
        }]);

        if (error) throw error;
        return data;
    },

    async getAllNotifications() {
        const { data, error } = await supabase.from('notifications').select('*');
        if (error) throw error;
        return data;
    },

    async getUserNotifications(user_id) {
        const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user_id);
        if (error) throw error;
        return data;
    },

    async markNotificationAsRead(id) {
        const { data, error } = await supabase.from('notifications').update({ read_status: true }).eq('id', id);
        if (error) throw error;
        return data;
    },

    async deleteNotification(id) {
        const { data, error } = await supabase.from('notifications').delete().eq('id', id);
        if (error) throw error;
        return data;
    }
};

module.exports = Notification;