import React from 'react';

const Section = ({ 
  children, 
  className = "", 
  backgroundElements = true,
  leftBlob = true,
  rightBlob = true,
  bottomBlob = false 
}) => {
  return (
    <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      {backgroundElements && (
        <>
          {leftBlob && (
            <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          )}
          {rightBlob && (
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          )}
          {bottomBlob && (
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          )}
        </>
      )}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;
