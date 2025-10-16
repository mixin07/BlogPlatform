const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
	res.json({ message: 'BlogPlatform Backend API' });
});

module.exports = app;


