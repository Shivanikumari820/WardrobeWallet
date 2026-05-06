import React from 'react';
import oldclothesImg from '../../assets/oldclothes.png';
const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('schedule-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
        backgroundImage: `url(${oldclothesImg})`,
          filter: 'blur(3px)',
          transform: 'scale(1.1)' // Prevents blur edges
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Schedule a <span className="text-yellow-400">Pickup</span>
        </h1>
        
        <p className="text-lg md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Turn your old clothes into cash — doorstep pickup, easy and fast!
        </p>
        
        <button
          onClick={scrollToForm}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Book Now
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;