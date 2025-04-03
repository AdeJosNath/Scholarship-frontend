const Scholarship = require('../models/scholarshipModel');

exports.createScholarship = async (req, res) => {
    try {
        const { title, description, deadline, eligibility } = req.body;
        const scholarship = await Scholarship.createScholarship(title, description, deadline, eligibility);
        res.status(201).json({ message: 'Scholarship created successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.getAllScholarships();
        res.status(200).json(scholarships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getScholarshipById = async (req, res) => {
    try {
        const { id } = req.params;
        const scholarship = await Scholarship.getScholarshipById(id);
        res.status(200).json(scholarship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const scholarship = await Scholarship.updateScholarship(id, updatedData);
        res.status(200).json({ message: 'Scholarship updated successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        await Scholarship.deleteScholarship(id);
        res.status(200).json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

