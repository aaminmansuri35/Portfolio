import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { gsap } from 'gsap';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navItemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      navItemsRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5
      }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-10 transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <a href="#home" className="flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Aamin Mansuri</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <nav className="flex items-center space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  ref={el => navItemsRef.current[index] = el}
                  className="text-base font-medium hover:text-blue-500 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300"
              aria-label="Toggle theme"
              ref={el => navItemsRef.current[5] = el}
            >
              {isDarkMode ? (
                <i className="fa-solid fa-sun text-yellow-300 text-xl"></i>
              ) : (
                <i className="fa-solid fa-moon text-blue-700 text-xl"></i>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-4 rounded-full transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <i className="fa-solid fa-sun text-yellow-300 text-xl"></i>
              ) : (
                <i className="fa-solid fa-moon text-blue-700 text-xl"></i>
              )}
            </button>
            
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4 pb-2`}>
          <nav className="flex flex-col space-y-4">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-2 px-4 rounded hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;