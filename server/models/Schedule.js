const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  clothTypes: [{ type: String }],
  estimatedQuantity: { type: String },
  specialInstructions: { type: String },
  status: { type: String, default: 'scheduled' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);


