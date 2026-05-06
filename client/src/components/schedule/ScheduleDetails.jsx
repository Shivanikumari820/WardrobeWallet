import React from 'react';
import { Calendar } from 'lucide-react';

const ScheduleDetails = ({ formData, handleInputChange, handleClothTypeChange }) => {
  const timeSlots = [
    '09:00 AM - 12:00 PM',
    '12:00 PM - 03:00 PM',
    '03:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const clothTypes = [
    'Cotton Clothes',
    'Silk Sarees',
    'Woolen Items',
    'Denim',
    'Mixed Fabrics',
    'Designer Wear',
    'Kids Clothes',
    'Others'
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Calendar className="text-blue-500" size={20} />
        <span className="text-base sm:text-xl">Schedule & Cloth Details</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Cloth Types *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {clothTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.clothTypes.includes(type)}
                onChange={() => handleClothTypeChange(type)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-xs sm:text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Quantity (kg) *</label>
        <select
          name="estimatedQuantity"
          value={formData.estimatedQuantity}
          onChange={handleInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select quantity</option>
          <option value="1-5">1-5 kg</option>
          <option value="5-10">5-10 kg</option>
          <option value="10-20">10-20 kg</option>
          <option value="20+">20+ kg</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special instructions for pickup..."
        />
      </div>
    </div>
  );
};

export default ScheduleDetails;
