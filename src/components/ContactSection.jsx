import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = new FormData();
    form.append('access_key', 'e51f63ab-f538-4a1e-bf36-a20f499427a7'); // Replace with real key
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('subject', formData.subject);
    form.append('message', formData.message);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: form,
    });

    const result = await response.json();
    if (result.success) {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 3000);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 3000);
    }
  };


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
        }
      }
    );

    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      contactInfoRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'
        }`}
    >
      <div className="container mx-auto px-6">
     
            <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
       Get In Touch
            <span className="block h-1 w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>
          

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform transition hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
              >
                {formStatus === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <div className="text-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                  Your message has been sent successfully!
                </div>
              )}
              {formStatus === 'error' && (
                <div className="text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                  Something went wrong. Please try again.
                </div>
              )}

            </form>
          </div>

          <div
            ref={contactInfoRef}
            className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Feel free to reach out to me through any of these channels. I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                  <i className="fa-solid fa-envelope text-blue-500 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <a href="mailto:aamin.aaminsnmtech@gmail.com" className="hover:underline hover:text-blue-500 transition-colors">
                     aaminsnmtech@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                  <i className="fa-solid fa-phone text-blue-500 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <a href="tel:7698682249" className="hover:underline hover:text-blue-500 transition-colors">
                      +91 7698682249
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                  <i className="fa-solid fa-location-dot text-blue-500 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Bapunagar Ahmedabad
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-lg font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: 'fa-brands fa-github', href: '#', color: 'hover:text-gray-500' },
                  { icon: 'fa-brands fa-linkedin', href: '#', color: 'hover:text-blue-600' },
                
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-xl transition-colors ${isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700'
                      } ${item.color}`}
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;