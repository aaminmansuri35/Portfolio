import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import ProjectModal from './ProjectModal';
import img from "/assets/images/screencapture-metrotraders-co-in-2025-07-31-13_09_08.jpg"
gsap.registerPlugin(ScrollTrigger);

const projects = [
{
  id: 1,
  title: "E-Commerce Website",
  category: "Web Development",
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  description: "A clean and responsive e-commerce website built using HTML, CSS, and JavaScript. It features a modern layout, product showcase, and smooth navigation for a better user experience.",
  technologies: ["HTML", "CSS", "JavaScript"],
  link: "https://idigipie.com/SRS/"
},
 {
  id: 2,
  title: "Automotive Services Website",
  category: "React JS",
  image: img,
  description: "A modern and responsive automotive services website built with React JS and Tailwind CSS. It features a dynamic hero slider, service showcase, and a clean design for an engaging user experience.",
  technologies: ["React JS", "Tailwind CSS", "JavaScript"],
  link: "https://metrotraders.co.in/"
}
,  {
    id: 3,
    title: "Travel Blog",
    category: "WordPress",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "A feature-rich travel blog with custom post types, categories, and social media integration for sharing travel experiences.",
    technologies: ["WordPress", "Elementor", "CSS", "PHP"],
    link: "https://sarasautoelectricals.com/"
  },

 {
  id: 4,
  title: "Educational Landing Page",
  category: "Web Development",
  image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  description: "A responsive and modern educational landing page built using HTML, CSS, and JavaScript. It highlights courses, key features, and contact options with a clean design for easy navigation.",
  technologies: ["HTML", "CSS", "JavaScript"],
  link: "https://idigipie.com/DrDas/"
},
  {
    id: 5,
    title: "Real Estate Portal",
    category: "WordPress",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "A comprehensive real estate website with property listings, advanced search filters, and agent profiles for a seamless property hunting experience.",
    technologies: ["WordPress", "Elementor", "CSS", "JavaScript"],
    link: "https://sarasautoelectricals.com/"
  }
];

const ProjectsSection = () => {
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const projectsRef = useRef([]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);
  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );

    // Filters animation
    gsap.fromTo(
      filtersRef.current.querySelectorAll('button'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 85%',
        }
      }
    );

    // Projects animation
    gsap.fromTo(
      projectsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filter]);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              My Projects
              <span className="block h-1 w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
            </h2>
          </div>

          <div
            ref={filtersRef}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${filter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              ref={el => projectsRef.current[index] = el}
            >

              <div
                className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } h-full flex flex-col`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full mb-2">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description
                    }
                  </p>
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => openModal(project)}
                      className="inline-flex items-center font-medium text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  );
};

export default ProjectsSection;