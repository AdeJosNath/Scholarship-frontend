const Application = require('../models/applicationModel');

exports.createApplication = async (req, res) => {
    try {
        const { student_id, scholarship_id, essay } = req.body;
        const application = await Application.createApplication(student_id, scholarship_id, essay);
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.getApplicationById(id);
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const application = await Application.updateApplication(id, updatedData);
        res.status(200).json({ message: 'Application updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        await Application.deleteApplication(id);
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
