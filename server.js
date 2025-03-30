require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

// conn to mongodb
connectDB();

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// route
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// app.get('/', (req, res) => {
//     res.send('App is started');
// });

// app.get('/about', (req, res) => {
//     res.send("This is a simple Task Management Application which im making by using NodeJS & ExpressJS for the very first time");
// });

