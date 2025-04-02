// controllers/applicationController.js
const supabase = require('../config/supabaseClient');

exports.getAllApplications = async (req, res) => {
    try {
        // Fetch applications with applicant names and scholarship titles
        const { data, error } = await supabase
            .from('applications')
            .select(`
                id,
                status,
                submitted_at,
                users (id, first_name, last_name, email),
                scholarships (id, title)
            `);
        
        if (error) throw error;
        
        // Format the data for frontend consumption
        const formattedData = data.map(app => ({
            id: app.id,
            applicant_name: `${app.users.first_name} ${app.users.last_name}`,
            applicant_id: app.users.id,
            applicant_email: app.users.email,
            scholarship_title: app.scholarships.title,
            scholarship_id: app.scholarships.id,
            date_submitted: app.submitted_at,
            status: app.status
        }));
        
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { data, error } = await supabase
            .from('applications')
            .select(`
                *,
                users (id, first_name, last_name, email),
                scholarships (id, title)
            `)
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validate status
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        
        const { data, error } = await supabase
            .from('applications')
            .update({ 
                status,
                reviewed_at: new Date().toISOString(),
                reviewed_by: req.user.id
            })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        
        // After updating status, prepare notification for user
        if (data && data[0]) {
            // Get user information
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('email')
                .eq('id', data[0].user_id)
                .single();
                
            if (!userError && userData) {
                // Create notification in database
                await supabase
                    .from('notifications')
                    .insert([{
                        user_id: data[0].user_id,
                        message: `Your application has been ${status.toLowerCase()}.`,
                        type: status.toLowerCase(),
                        application_id: data[0].id,
                        created_at: new Date().toISOString()
                    }]);
                
                // Note: In a real application, you might also send an email here
                console.log(`Notification created for user with email: ${userData.email}`);
            }
        }
        
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchApplications = async (req, res) => {
    try {
        const { query } = req.query;
        
        // Join tables to search by applicant name or scholarship title
        const { data, error } = await supabase
            .from('applications')
            .select(`
                id,
                status,
                submitted_at,
                users!inner (id, first_name, last_name, email),
                scholarships!inner (id, title)
            `)
            .or(`users.first_name.ilike.%${query}%,users.last_name.ilike.%${query}%,scholarships.title.ilike.%${query}%`);
        
        if (error) throw error;
        
        // Format the data for frontend consumption
        const formattedData = data.map(app => ({
            id: app.id,
            applicant_name: `${app.users.first_name} ${app.users.last_name}`,
            applicant_id: app.users.id,
            applicant_email: app.users.email,
            scholarship_title: app.scholarships.title,
            scholarship_id: app.scholarships.id,
            date_submitted: app.submitted_at,
            status: app.status
        }));
        
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};