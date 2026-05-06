import React, { useState, useEffect } from 'react';

const Carousel = ({ 
  items, 
  renderItem, 
  autoSlide = true, 
  slideInterval = 4000,
  showDots = true,
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    
    const totalSlides = Math.ceil(items.length / itemsPerView);
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [itemsPerView, items.length, autoSlide, slideInterval]);

  const goToSlide = (index) => setCurrentIndex(index);
  const totalSlides = Math.ceil(items.length / itemsPerView);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="px-3 flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-orange-500 w-8'
                  : 'bg-gray-300 hover:bg-orange-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
