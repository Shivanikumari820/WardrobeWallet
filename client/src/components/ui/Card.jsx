import React from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient = 'from-gray-400 to-gray-600',
  className = '' 
}) => {
  return (
    <div 
      className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden ${className}`}
    >

      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
      
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 `}>
        {icon}
      </div>
      
    
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>

      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-100 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default FeatureCard;
