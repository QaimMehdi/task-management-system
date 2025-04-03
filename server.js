require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Task Management System API is running' });
});

// route
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET /');
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

