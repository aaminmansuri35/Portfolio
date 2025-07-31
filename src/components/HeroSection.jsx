import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';
import Typed from 'typed.js';

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  // ===== 1. ANIMATED PARTICLE BACKGROUND =====
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = isDarkMode
      ? ['#6366f1aa', '#8b5cf6aa', '#ec4899aa']
      : ['#3b82f6aa', '#7c3aedaa', '#a855f7aa'];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }

    // Draw connecting lines
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) +
            Math.pow(particles[a].y - particles[b].y, 2)
          );
          if (distance < 150) {
            ctx.strokeStyle = `${particles[a].color}${Math.floor((1 - distance / 150) * 10)}0`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, isDarkMode ? 'rgba(15, 10, 35, 0.7)' : 'rgba(230, 240, 255, 0.6)');
      gradient.addColorStop(1, isDarkMode ? 'rgba(5, 2, 15, 0.9)' : 'rgba(255, 255, 255, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      connect();

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isDarkMode]);

  // ===== 2. GSAP ANIMATIONS =====
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );

    // Typing animation
    const typed = new Typed(subHeadingRef.current, {
      strings: ["Frontend Developer", "WordPress Developer", "React.js Specialist"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: '▌',
    });

    return () => typed.destroy();
  }, []);

  return (
    <section
      id="home"
      className={`relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-screen flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
    >
      {/* === 3D PARTICLE BACKGROUND === */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-50 w-full h-full pointer-events-none"
      />

      {/* === ANIMATED GRADIENT BLOBS === */}
      <div className="absolute inset-0 -z-40 overflow-hidden">
        <div className={`absolute w-[300px] h-[300px] rounded-full blur-[100px] ${isDarkMode ? 'bg-purple-900/40' : 'bg-blue-300/40'
          } top-20 left-20 animate-float`}></div>
        <div className={`absolute w-[400px] h-[400px] rounded-full blur-[120px] ${isDarkMode ? 'bg-indigo-900/40' : 'bg-indigo-200/40'
          } bottom-10 right-10 animate-float-delay`}></div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Text Content */}
          <div className="w-full max-w-3xl space-y-6">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
                Aamin Mansuri
              </span>
            </h2>

            <h3
              ref={subHeadingRef}
              className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 min-h-[40px] text-purple-400"
            ></h3>
            <p
              ref={descriptionRef}
              className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                } mx-auto max-w-2xl`}
            >
              I create <span className="font-bold">high-performance websites</span> with modern technologies.
              Let’s bring your ideas to life and build a website that truly <span className="italic">stands out</span>.
            </p>


            <div ref={ctaRef} className="pt-4 flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="relative inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full font-medium hover:shadow-xl transform transition hover:-translate-y-1 hover:scale-105 group overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a
                href="#projects"
                className={`inline-block py-3 px-8 rounded-full font-medium border-2 ${isDarkMode
                  ? 'border-purple-400 text-white hover:bg-purple-900 hover:shadow-purple-glow'
                  : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-blue-glow'
                  } transition-all duration-300`}
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* === GLOBAL STYLES === */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        .shadow-purple-glow {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
        }
        .shadow-blue-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.7);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;