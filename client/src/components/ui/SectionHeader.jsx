import React from 'react';

const SectionHeader = ({ 
  subtitle, 
  title, 
  description,
  className = "", 
  centered = true,
  subtitleColor = "text-green-600",
  titleGradient = "from-green-700 via-green-500 to-green-700",
  underlineGradient = "from-green-400 to-lime-500"
}) => {
  return (
    <div className={`mb-10 sm:mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {/* Subtitle */}
      {subtitle && (
        <p className={`${subtitleColor} font-bold mb-3 sm:mb-4 text-lg sm:text-xl tracking-wider uppercase`}>
          {subtitle}
        </p>
      )}

      {/* Title with gradient */}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6`}>
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
          {description}
        </p>
      )}

      {/* Decorative underline */}
      <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${underlineGradient} ${centered ? 'mx-auto' : ''} rounded-full mb-4`}></div>
    </div>
  );
};

export default SectionHeader;
