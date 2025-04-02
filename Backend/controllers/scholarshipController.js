const supabase = require('../config/supabaseClient');

exports.getAllScholarships = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('scholarships')
            .select('*');
        
        if (error) throw error;
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createScholarship = async (req, res) => {
    try {
        const { title, deadline, status } = req.body;
        
        const { data, error } = await supabase
            .from('scholarships')
            .insert([
                { 
                    title, 
                    deadline, 
                    status, 
                    created_by: req.user.id 
                }
            ])
            .select();
        
        if (error) throw error;
        
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, deadline, status } = req.body;
        
        const { data, error } = await supabase
            .from('scholarships')
            .update({ title, deadline, status })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { error } = await supabase
            .from('scholarships')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchScholarships = async (req, res) => {
    try {
        const { query } = req.query;
        
        const { data, error } = await supabase
            .from('scholarships')
            .select('*')
            .ilike('title', `%${query}%`);
        
        if (error) throw error;
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};