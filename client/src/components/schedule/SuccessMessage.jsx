import React from 'react';
import { CheckCircle, Calendar, Clock } from 'lucide-react';

const SuccessMessage = ({ formData }) => {
  return (
    <div className="text-center space-y-6 sm:space-y-8 px-4 py-8">
      {/* Animated success icon */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
          <CheckCircle className="text-white animate-pulse" size={40} />
        </div>
        {/* Celebration particles */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -top-2 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-green-400 rounded-full animate-ping delay-700"></div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          🎉 Pickup Scheduled Successfully!
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
          We'll contact you shortly to confirm your pickup details and arrange the collection.
        </p>
      </div>
      
      {/* Enhanced pickup details card */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Calendar className="text-green-600" size={20} />
          Pickup Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Date:</span>
            <span className="font-semibold text-gray-800">{formData.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Time:</span>
            <span className="font-semibold text-gray-800">{formData.timeSlot}</span>
          </div>
          <div className="flex items-center justify-center mt-4 text-xs text-green-700 bg-green-100 py-2 px-4 rounded-full">
            <Clock size={14} className="mr-1" />
            Our team will arrive during your selected time slot
          </div>
        </div>
      </div>
      
      {/* Additional info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-lg mx-auto">
        <p className="text-sm text-blue-800">
          💡 <strong>Pro Tip:</strong> Keep your clothes ready and sorted for faster pickup and better pricing!
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
