const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create schedule', error: error.message });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  }
};
