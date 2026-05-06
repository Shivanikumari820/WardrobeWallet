import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png"; 
import { CircleUserRound, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-white via-green-50/30 to-white backdrop-blur-lg shadow-[0_8px_32px_rgba(34,197,94,0.15)] border-b border-green-100/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          
          <Link to="/" className="flex items-center group relative">
            <div className="relative">
              <img 
                src={logo} 
                alt="Cloth2Cash Logo" 
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto mr-3 sm:mr-4 drop-shadow-lg hover:scale-110 transition-all duration-500 group-hover:scale-110 relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-gray-800 bg-clip-text text-transparent hover:from-green-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-500">
              Cloth<span className="text-green-600 drop-shadow-sm">2</span>Cash
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8 text-gray-700 font-medium text-base xl:text-lg items-center">
            { [
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Schedule Pickup" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-3 xl:px-4 py-2 rounded-xl "
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
            
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white px-4 xl:px-6 py-2.5 rounded-xl hover:from-green-700 hover:via-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 text-sm xl:text-base font-semibold"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="relative group">
                  <CircleUserRound
                    className="w-9 h-10 text-green-700 hover:text-green-800 cursor-pointer transition-all duration-300 hover:scale-110 drop-shadow-sm"
                    aria-label="Profile"
                  />
                  <div className="absolute inset-0 bg-green-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150 blur-md"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden space-x-3 text-gray-700 font-medium text-sm items-center">
            {[
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Pickup" },
              { to: "/how-it-works", label: "How" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-2 py-2 rounded-lg hover:text-green-600 transition-all duration-300 "
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
            
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 text-xs font-semibold"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <CircleUserRound
                    className="w-8 h-10 text-green-700 hover:text-green-800 cursor-pointer transition-all duration-300 hover:scale-110"
                    aria-label="Profile"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 px-2 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-green-600 focus:outline-none bg-gradient-to-r from-gray-50 to-green-50/50 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
            >
              <svg
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible pb-4 sm:pb-6"
              : "max-h-0 opacity-0 invisible pb-0"
          } overflow-hidden`}
        >
          <div className="px-2 sm:px-3 pt-3 sm:pt-4 space-y-1 bg-gradient-to-br from-white via-green-50/30 to-white rounded-xl sm:rounded-2xl mt-3 sm:mt-4 mx-1 border border-green-200/50 backdrop-blur-sm">
            { [
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Schedule Pickup" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 sm:px-4 py-3 sm:py-4 text-gray-800 font-medium hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-lg sm:rounded-xl transition-all duration-300 text-base sm:text-lg hover:transform hover:translate-x-1"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="px-1 sm:px-2 pt-2 sm:pt-3 pb-3 sm:pb-4 flex items-center justify-center gap-2">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-green-700 hover:via-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CircleUserRound
                      className="w-9 h-10 text-green-700 hover:text-green-800 cursor-pointer transition-all duration-300 hover:scale-110"
                      aria-label="Profile"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;



