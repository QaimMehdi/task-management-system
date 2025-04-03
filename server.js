require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'], // Allow specific headers
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Task Management System API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('Auth routes:');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/auth/me');
    console.log('Task routes:');
    console.log('- GET /api/tasks');
    console.log('- POST /api/tasks');
    console.log('- GET /api/tasks/:id');
    console.log('- PUT /api/tasks/:id');
    console.log('- DELETE /api/tasks/:id');
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});


// app.get('/', (req, res) => {
//     res.send('App is started');
// });

// app.get('/about', (req, res) => {
//     res.send("This is a simple Task Management Application which im making by using NodeJS & ExpressJS for the very first time");
// });

