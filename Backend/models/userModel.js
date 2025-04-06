const supabase = require('../config/supabaseClient');

const User = {
    async createUser(email, password, role) {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) throw error;

        await supabase.from('users').insert([{ id: user.id, email, role }]);
        return user;
    },

    async getUserByEmail(email) {
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
        if (error) throw error;
        return data;
    }
};

module.exports = User;