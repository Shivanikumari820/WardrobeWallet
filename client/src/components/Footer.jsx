import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Modal from './Modal';
import Privacy from './Privacy';
import Terms from './Terms';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-br from-green-200 via-emerald-400 to-teal-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-green-950 bg-opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
        
        <div className="relative z-10 py-10 px-2 sm:px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center text-center sm:text-left">
              {/* Brand Section */}
              <div className="lg:col-span-1 flex flex-col items-center sm:items-start">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Cloth2Cash
                </h2>
                <p className="text-gray-200 text-base leading-relaxed mb-4 sm:mb-6">
                  Transform your unused clothes into cash! We make it easy to sell your pre-loved garments while contributing to sustainable fashion.
                </p>
              </div>
              {/* Services Links */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-orange-400">Our Services</h3>
                <ul className="space-y-3 sm:space-y-4 text-base text-gray-200">
                  <li><a href="/schedule" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Sell Your Clothes</a></li>
                  <li><a href="/schedule" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Free Pickup</a></li>
                  <li><a href="/schedule" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Accepted Brands</a></li>
                  <li><a href="/how-it-works" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">How It Works</a></li>
                </ul>
              </div>
              {/* Quick Links */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-orange-400">Quick Links</h3>
                <ul className="space-y-3 sm:space-y-4 text-base text-gray-200">
                  <li><a href="/about" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">About Us</a></li>
                  <li><a href="#testimonials" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Customer Reviews</a></li>
                  <li><a href="/schedule" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
                  <li><a href="" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Fashion Blog</a></li>
                </ul>
              </div>
              {/* Contact & Social */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-orange-400">Get In Touch</h3>
                <div className="space-y-3 sm:space-y-4 text-base text-gray-200 mb-6 sm:mb-8">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <FaEnvelope className="text-orange-400 flex-shrink-0 text-lg" />
                    <span>sumanqaj9876@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <FaPhone className="text-orange-400 flex-shrink-0 text-lg" />
                    <span>+91 6299974421</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <FaMapMarkerAlt className="text-orange-400 flex-shrink-0 text-lg" />
                    <span>Bhopal, Madhya Pradesh</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-300 mb-3 sm:mb-4">Follow us for updates</p>
                  <div className="flex space-x-3 sm:space-x-4">
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                      <FaFacebookF className="text-lg" />
                    </a>
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                      <FaInstagram className="text-lg" />
                    </a>
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                      <FaTwitter className="text-lg" />
                    </a>
                    <a href="https://www.linkedin.com/in/suman-kumar-97310a25b/" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                      <FaLinkedinIn className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center w-full">
              <div className="text-sm sm:text-base text-gray-300 text-center md:text-left w-full">
                © {new Date().getFullYear()} Cloth2Cash. All rights reserved.
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base text-gray-300 text-center md:text-right w-full">
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setIsTermsOpen(true)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <Privacy />
      </Modal>

      <Modal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
      >
        <Terms />
      </Modal>
    </>
  );
};

export default Footer;
