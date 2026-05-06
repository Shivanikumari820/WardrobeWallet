import React from 'react'
import WhatWeDoAccordion from "../components/ui/Accordion"
import SectionHeader from "../components/ui/SectionHeader"
import oldclothesImg from '../assets/oldclothes.png'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${oldclothesImg})`,
            filter: 'blur(3px)',
            transform: 'scale(1.1)'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-400">Cloth2Cash</span>
          </h1>
          
          <p className="text-lg md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Making clothing disposal simple, rewarding, and sustainable
          </p>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            subtitle="OUR MISSION"
            title="Our Mission"
        
          />
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              At Cloth2Cash, we believe that every piece of fabric has value. In India, millions of households either hoard old clothes or discard them into landfills, contributing to growing textile waste and environmental damage. With limited disposal options and an unorganized recycling chain, usable fabrics often go to waste instead of finding a meaningful purpose.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed mt-6">
              We are on a mission to make clothing disposal simple, rewarding, and sustainable. Our digital platform connects households with certified recyclers and upcycling partners — ensuring that every garment is given a second life.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            subtitle="WHAT WE DO"
            title="What We Do"
           
          />
          
          <WhatWeDoAccordion />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            // subtitle="OUR VISION"
            title="Our Vision"
            description="To build a future where no fabric is wasted, and sustainable fashion becomes a way of life for every household."
            // subtitleColor="text-yellow-600"
            // titleGradient="from-gray-800 via-yellow-600 to-gray-800"
            // underlineGradient="from-yellow-400 to-orange-500"
            className="[&_p:last-child]:text-2xl [&_p:last-child]:md:text-3xl [&_p:last-child]:font-medium [&_p:last-child]:max-w-4xl"
          />
        </div>
      </section>

   
    </div>
  )
}

export default AboutPage