const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});