require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://wardrobe-wallet.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }

  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/pickups', scheduleRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cloth2Cash API is running!',
  });
});

app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  console.log('Available routes:');
  console.log('GET /api/users - Get all users');
  console.log('POST /api/users/signup - User signup');
  console.log('POST /api/users/login - User login');
  console.log('PUT /api/users/:id - Update user profile');
  console.log('DELETE /api/users/:id - Delete user');
});