const supabase = require('../config/supabaseClient');

const Application = {
    async createApplication(student_id, scholarship_id, essay, status = 'pending') {
        const { data, error } = await supabase.from('applications').insert([{ 
            student_id, scholarship_id, essay, status
        }]);

        if (error) throw error;
        return data;
    },

    async getAllApplications() {
        const { data, error } = await supabase.from('applications').select('*');
        if (error) throw error;
        return data;
    },

    async getApplicationById(id) {
        const { data, error } = await supabase.from('applications').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    },

    async updateApplication(id, updatedData) {
        const { data, error } = await supabase.from('applications').update(updatedData).eq('id', id);
        if (error) throw error;
        return data;
    },

    async deleteApplication(id) {
        const { data, error } = await supabase.from('applications').delete().eq('id', id);
        if (error) throw error;
        return data;
    }
};

module.exports = Application;
