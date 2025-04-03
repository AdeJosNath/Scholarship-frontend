const supabase = require('../config/supabaseClient');

const Scholarship = {
    async createScholarship(title, description, deadline, eligibility) {
        const { data, error } = await supabase.from('scholarship').insert([{ 
            title, description, deadline, eligibility 
        }]);

        if (error) throw error;
        return data;
    },

    async getAllScholarships() {
        const { data, error } = await supabase.from('scholarship').select('*');
        if (error) throw error;
        return data;
    },

    async getScholarshipById(id) {
        const { data, error } = await supabase.from('scholarship').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    },

    async updateScholarship(id, updatedData) {
        const { data, error } = await supabase.from('scholarship').update(updatedData).eq('id', id);
        if (error) throw error;
        return data;
    },

    async deleteScholarship(id) {
        const { data, error } = await supabase.from('scholarship').delete().eq('id', id);
        if (error) throw error;
        return data;
    }
};

module.exports = Scholarship;
