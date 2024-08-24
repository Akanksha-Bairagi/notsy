require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8007; // Keep this line as is if the port configuration is fine

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { // Use the MONGO_URI from .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if MongoDB connection fails
});

// Routes
const journalRoutes = require('./routes/journalRoutes.js');

app.use('/api/journals', journalRoutes);

// Serve static files (for React client)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Base route (EJS views, if applicable)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
