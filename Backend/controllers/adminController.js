const supabase = require('../config/supabaseClient');

exports.getAdminDashboard = async (req, res) => {
    try {
        // Fetch dashboard statistics
        const { data: scholarships } = await supabase.from('scholarships').select('*');
        const { data: applications } = await supabase.from('applications').select('*');
        const { data: pendingReviews } = await supabase.from('applications').select('*').eq('status', 'pending');

        res.status(200).json({
            activeScholarships: scholarships.length,
            totalApplications: applications.length,
            pendingReviews: pendingReviews.length,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
};
