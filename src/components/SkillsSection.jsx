import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML', icon: 'fa-brands fa-html5', color: 'text-orange-500', gradient: 'from-orange-400 to-red-500', level: 95 },
  { name: 'CSS', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500', gradient: 'from-blue-400 to-blue-600', level: 90 },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-400', gradient: 'from-yellow-400 to-yellow-600', level: 85 },
  { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: 'text-purple-500', gradient: 'from-purple-400 to-purple-600', level: 90 },
  { name: 'WordPress', icon: 'fa-brands fa-wordpress', color: 'text-blue-400', gradient: 'from-blue-400 to-indigo-500', level: 80 },
  { name: 'Elementor', icon: 'fa-solid fa-e', color: 'text-pink-500', gradient: 'from-pink-400 to-pink-600', level: 85 },
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400', gradient: 'from-cyan-400 to-blue-500', level: 50 },
];

const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
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
        },
      }
    );

    skillRefs.current.forEach((skill, index) => {
      if (!skill) return;

      // Animate the skill card
      gsap.fromTo(
        skill,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: skill,
            start: 'top 90%',
          },
        }
      );

      // Animate the progress bar
      const progressBar = skill.querySelector('.progress-bar');
      gsap.fromTo(
        progressBar,
        { width: 0 },
        {
          width: `${skills[index].level}%`,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: skill,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-16 md:py-24 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
            My Skills
            <span className="block h-1 w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => (skillRefs.current[index] = el)}
              className={`p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-gray-800 hover:shadow-blue-500/20'
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-4">
                  <i className={`${skill.icon} ${skill.color} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>

              {/* Triple Layer Progress Bar */}
              <div className={`relative h-3 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                {/* Background Layer 1 */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-40"></div>

                {/* Background Layer 2 (Stripes) */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.2)_0px,rgba(255,255,255,0.2)_10px,transparent_10px,transparent_20px)]"></div>

                {/* Main Animated Bar */}
                <div
                  className={`progress-bar relative h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
                  style={{ width: '0%' }}
                ></div>
              </div>
              <div className="mt-2 text-right font-medium text-sm">
                <span
                  className={`${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
