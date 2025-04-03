/* const supabase = require('../config/supabaseClient');

const authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Assuming you have a way to check if the user is an admin
        // This might involve checking a 'role' in your users table
        const { data: adminCheck, error: roleError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (roleError || !adminCheck || adminCheck.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: 'Authentication failed' });
    }
};

module.exports = { authenticateAdmin }; */

const supabase = require('../config/supabaseClient');

const authMiddleware = async (req, res, next) => {
    const { user_id } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user_id)
            .single();

        if (!user) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Authentication error' });
    }
};

module.exports = authMiddleware;
