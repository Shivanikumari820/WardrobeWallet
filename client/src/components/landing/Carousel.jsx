import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import Button from '../ui/Button';

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 5000, showDots = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const defaultSlides = [
    {
      id: 1,
      heading: "India's <span class='text-red-500 font-bold'>Textile Waste</span> Crisis",
      content: "Millions of clothes are hoarded or thrown away every year. They pile up in homes or landfills, causing pollution and waste.",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-red-500"
    },
    {
      id: 2,
      heading: "<span class='text-green-500 font-bold'>Cloth2Cash</span>: Recycle & Earn",
      content: "We make it easy for you to give away old clothes from your doorstep — and earn money for every kilo!",
      image: slide2,
      bgColor: "bg-gray-50",
      accentColor: "text-green-500"
    },
    {
      id: 3,
      heading: "<span class='text-blue-500 font-bold'>4 Simple Steps</span> to Earn from Old Clothes",
      content: " Upload •  Schedule Pickup •  Get Paid •  Recycle Responsibly",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-blue-500"
    },
    {
      id: 4,
      heading: "<span class='text-purple-500 font-bold'>Declutter, Earn</span> & Save the Planet",
      content: " Get cash •  Clear your space •  Reduce waste •  Support eco-friendly recycling",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-purple-500"
    }
  ];

  const slidesToShow = slides || defaultSlides;

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slidesToShow.length]);


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleGetStarted = () => {
    navigate('/schedule');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <>
      <div className="relative w-full max-w-screen-7xl mx-auto bg-white rounded-2xl overflow-hidden h-[90vh] lg:h-[92vh] min-h-[600px] lg:min-h-[400px] max-h-[900px] shadow-2xl border border-gray-100">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesToShow.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 h-full relative overflow-hidden"
            >
              {/* Background Image with Enhanced Blur */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt="Background" 
                  className="w-full h-full object-cover blur-[3px] scale-110 brightness-75"
                />
                {/* Enhanced gradient overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Centered Content with better spacing */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-6 sm:px-8 md:px-12 lg:px-20 max-w-5xl">
                  {/* Step indicator with better styling */}
                  <div className="mb-8">
                    <span className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-md rounded-full text-sm font-semibold shadow-lg border border-white/20 text-gray-700 tracking-wide">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                      Step {slide.id} of 4
                    </span>
                  </div>

                  {/* Enhanced heading typography */}
                  <h2
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-[1.1] tracking-tight"
                    style={{
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }}
                    dangerouslySetInnerHTML={{ __html: slide.heading.replace(/text-\w+-\d+/g, 'text-yellow-300') }}
                  />

                  {/* Enhanced divider */}
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full shadow-lg"></div>
                  </div>

                  {/* Enhanced content text */}
                  <div className="mb-10 max-w-3xl mx-auto">
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-50 leading-relaxed font-light tracking-wide"
                       style={{
                         textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                         lineHeight: '1.6'
                       }}>
                      {slide.content}
                    </p>
                  </div>

                  {/* Enhanced button group */}
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center items-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="group w-full sm:w-auto text-lg px-10 py-4 font-semibold hover:scale-105 transition-all duration-300 shadow-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 rounded-full"
                      onClick={handleGetStarted}
                    >
                      <span className="flex items-center">
                        Get Started
                        <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group w-full sm:w-auto text-lg px-10 py-4 font-semibold hover:scale-105 transition-all duration-300 bg-white/15 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 rounded-full shadow-xl"
                      onClick={handleLearnMore}
                    >
                      <span className="flex items-center">
                        Learn More
                        <svg className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced dots navigation */}
        {showDots && (
          <div className="absolute bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-white/25 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border border-white/20">
            {slidesToShow.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 hover:scale-110 ${index === currentSlide
                    ? 'w-8 h-3 bg-white rounded-full shadow-lg'
                    : 'w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Enhanced progress bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${((currentSlide + 1) / slidesToShow.length) * 100}%` }}
          />
        </div>

        {/* Navigation arrows for better UX */}
        <button
          onClick={() => goToSlide(currentSlide === 0 ? slidesToShow.length - 1 : currentSlide - 1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg border border-white/20 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => goToSlide((currentSlide + 1) % slidesToShow.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg border border-white/20 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Carousel;
