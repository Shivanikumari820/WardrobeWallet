require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');



const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Add debugging middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/pickups', scheduleRoutes); // Add this line for pickup endpoints



app.get('/', (req, res) => {
  res.json({ message: 'Cloth2Cash API is running!' });
});

// Add 404 handler for unmatched routes - Use proper Express syntax
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ 
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found` 
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: err.message 
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

// No changes needed here if your scheduleRoutes handles status update and returns updated pickup.
// Make sure your PUT/PATCH endpoint for updating status in routes/schedule.js looks like this:

// Example in routes/schedule.js:
// router.patch('/:id/status', async (req, res) => {
//   const { status } = req.body;
//   const updated = await Schedule.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   res.json(updated);
// });
