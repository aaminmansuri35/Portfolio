import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProjectModal = ({ project, onClose, isDarkMode }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation for modal background
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    // Animation for modal content
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Close with escape key
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleClose = () => {
    // Animation for closing
    gsap.to(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className={`relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="h-56 sm:h-72 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full mb-2">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold">{project.title}</h3>
          </div>
          
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.description}
          </p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;