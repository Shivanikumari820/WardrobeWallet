require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');

const app = express();

// PORT for Render deployment
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://your-frontend.vercel.app', // Replace after Vercel deploy
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url}`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }

  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/pickups', scheduleRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cloth2Cash API is running!',
  });
});

// 404 Handler
app.use((req, res) => {
  console.log(
    '404 - Route not found:',
    req.method,
    req.originalUrl
  );

  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  console.log('Available routes:');
  console.log('GET /api/users - Get all users');
  console.log('POST /api/users/signup - User signup');
  console.log('POST /api/users/login - User login');
  console.log('PUT /api/users/:id - Update user profile');
  console.log('DELETE /api/users/:id - Delete user');
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');

const app = express();

// PORT for Render deployment
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://wardrobe-wallet.vercel.app', // Replace after Vercel deploy
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url}`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }

  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/pickups', scheduleRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cloth2Cash API is running!',
  });
});

// 404 Handler
app.use((req, res) => {
  console.log(
    '404 - Route not found:',
    req.method,
    req.originalUrl
  );

  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  console.log('Available routes:');
  console.log('GET /api/users - Get all users');
  console.log('POST /api/users/signup - User signup');
  console.log('POST /api/users/login - User login');
  console.log('PUT /api/users/:id - Update user profile');
  console.log('DELETE /api/users/:id - Delete user');
});
// No changes needed here if your scheduleRoutes handles status update and returns updated pickup.
// Make sure your PUT/PATCH endpoint for updating status in routes/schedule.js looks like this:

// Example in routes/schedule.js:
// router.patch('/:id/status', async (req, res) => {
//   const { status } = req.body;
//   const updated = await Schedule.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   res.json(updated);
// });
