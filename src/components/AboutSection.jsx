import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // when 80% of viewport
        },
      }
    );

    // Animate underline span inside title
    gsap.fromTo(
      titleRef.current.querySelector("span"),
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate content paragraphs
    gsap.fromTo(
      contentRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-16 md:py-24 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
            About Me
            <span className="block h-1 w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
          </h2>

          <div ref={contentRef}>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I'm a passionate web developer and designer with{" "}
              <span className="font-bold">2 years of experience</span> in
              building modern, user-friendly websites. I've worked on projects
              ranging from personal portfolios to business and e-commerce
              platforms.
            </p>
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              My approach blends{" "}
              <span className="italic">technical expertise</span> with{" "}
              <span className="font-bold">creative design thinking</span>,
              ensuring every project looks professional and provides a seamless
              user experience. I stay updated with the latest web technologies
              to deliver high-quality solutions that help businesses grow online.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
