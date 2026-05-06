const express = require('express');
const router = express.Router();
const { createSchedule, getAllSchedules } = require('../controllers/scheduleController');
const Schedule = require('../models/Schedule');

// GET /api/schedule - Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  }
});

// POST /api/schedule - Create a new schedule
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create schedule', error: error.message });
  }
});

// PATCH /api/schedule/:id/status - update status of a pickup
router.patch('/:id/status', async (req, res) => {
  try {
    console.log('PATCH request received for ID:', req.params.id);
    console.log('Status to update:', req.body.status);
    
    const { status } = req.body;
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updated) {
      console.log('Pickup not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Pickup not found' });
    }
    
    console.log('Status updated successfully:', updated);
    res.json(updated);
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
});

// DELETE route for deleting a pickup/schedule
router.delete('/:id', async (req, res) => {
  try {
    const pickup = await Schedule.findByIdAndDelete(req.params.id);
    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }
    res.json({ message: 'Pickup deleted successfully', deletedPickup: pickup });
  } catch (error) {
    console.error('Delete pickup error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
