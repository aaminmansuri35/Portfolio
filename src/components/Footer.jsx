import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const footerRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={`py-10 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="flex items-center text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Aamin Mansuri
              </span>
            </a>
            <p className={`mt-2 max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Creating beautiful digital experiences through modern web technologies.
            </p>
          </div>
          
          <div className="flex space-x-5">
            {[
              { icon: 'fa-brands fa-github', href: '#' },
              { icon: 'fa-brands fa-linkedin', href: '#' },
         
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-full text-xl transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-500'
                }`}
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`mb-4 md:mb-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Aamin Mansuri. All rights reserved.
            </p>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;