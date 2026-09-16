import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { RiBookShelfLine, RiCommandLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";
import mainImg from "../public/img/vaibhav .jpeg"

// Sophisticated animation orchestrations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 60, damping: 15 } 
  }
};

// Full-Page Immersive Live Background
const FullPageLiveBackground = ({ mouseX, mouseY }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particles = Array.from({ length: 35 });

  const bgTransformX = useTransform(mouseX, (value) => value * 0.2);
  const bgTransformY = useTransform(mouseY, (value) => value * 0.2);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 min-h-full">
      <motion.div style={{ x: bgTransformX, y: bgTransformY }} className="absolute inset-0 w-full h-full">
        {particles.map((_, i) => {
          const randomTop = Math.random() * 100;
          const randomLeft = Math.random() * 100;
          const size = Math.random() * 8 + 4;
          const duration = Math.random() * 15 + 15;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-indigo-500/10 via-amber-500/10 to-transparent blur-[2px]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${randomTop}%`,
                left: `${randomLeft}%`,
              }}
              animate={{
                y: [0, Math.random() * -120 - 40, 0],
                x: [0, Math.random() * 80 - 40, 0],
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.45, 0.15]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </motion.div>

      <div className="absolute top-0 left-1/4 w-150 h-150 bg-indigo-500/5 rounded-full blur-[140px] animate-pulse duration-9000" />
      <div className="absolute top-[35vh] right-1/4 w-125 h-125 bg-amber-500/5 rounded-full blur-[120px] animate-pulse duration-7000" />
      <div className="absolute top-[70vh] left-1/3 w-137.5 h-137.5 bg-indigo-500/5 rounded-full blur-[130px] animate-pulse duration-10000" />
      <div className="absolute top-[110vh] right-1/3 w-112.5 h-112.5 bg-amber-500/5 rounded-full blur-[110px] animate-pulse duration-8000 " />
    </div>
  );
};

// Premium Navigation Bar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-[#030712]/80 backdrop-blur-md border-b border-zinc-900/80 py-4 shadow-lg shadow-black/20" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform hover:text-amber-600" />
          <span>Vaibhav<span className="text-amber-500">.</span>dev</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center  gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-[#030712]/95 backdrop-blur-lg border-b border-zinc-900 px-6 py-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 bg-amber-500 text-neutral-950 font-bold rounded-xl text-sm shadow-md mt-2"
          >
            Connect
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleGlobalMouseMove = (e) => {
    const currentX = e.clientX - window.innerWidth / 2;
    const currentY = e.clientY - window.innerHeight / 2;
    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-amber-500 via-indigo-500 to-amber-500 z-50 origin-left" 
        style={{ scaleX }} 
      />

      <Navbar />

      <div 
        onMouseMove={handleGlobalMouseMove}
        className="bg-[#030712] text-zinc-300 min-h-screen font-sans antialiased selection:bg-amber-500/20 selection:text-amber-400 overflow-x-hidden relative pt-16"
      >
        <FullPageLiveBackground mouseX={mouseX} mouseY={mouseY} />

        <header id="home" className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-between gap-12 px-6 sm:px-12 lg:px-16 py-20 relative z-10">
          <motion.div 
            style={{ y: heroY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            className="flex-1 flex flex-col gap-6 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-md border border-amber-500/20 w-max tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Available for Full-Time Roles & Internships
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Vaibhav</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl border-l-2 border-zinc-800 pl-4">
              MERN Stack Developer specializing in crafting responsive, full-stack web applications and scalable e-commerce & event management systems using React and Node.js.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <motion.a 
                href="https://github.com" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, backgroundColor: "#1f2937", borderColor: "#4b5563" }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium border border-zinc-800 transition-colors shadow-md text-sm"
              >
                <FaGithub className="text-base text-zinc-400" /> GitHub
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/vaibhav2303/" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, filter: "brightness(1.1)" }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 text-sm"
              >
                <FaLinkedin className="text-base" /> Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
            className="flex-1 flex justify-center items-center relative z-10"
          >
            <motion.div 
              className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="absolute inset-0 border border-zinc-800 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl p-2 bg-[#030712]">
                <img 
                  className="w-full h-full rounded-xl object-cover" 
                  src={mainImg}
                  alt="Vaibhav Profile" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
            </motion.div>
          </motion.div>
        </header>

        <section id="skills" className="bg-zinc-950/20 border-y border-zinc-900/60 py-24 relative z-10 backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 flex items-center justify-between"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Technical Capabilities</h2>
                <div className="h-1 w-10 bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full" />
              </div>
              <RiCommandLine className="text-4xl text-zinc-800 hidden sm:block" />
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { title: "Frontend Engineering", items: ["React.js, JavaScript ", "Tailwind CSS, Framer Motion", "HTML5, Bootstrap"] },
                { title: "Backend Architecture", items: ["Node.js, Express.js", "RESTful API Development", "Django, Python Integration"] },
                { title: "Database Systems", items: ["MongoDB, Mongoose ORM", "Relational Databases (SQL)", "Database Schema Architecture"] },
                { title: "Development & DevOps Tools", items: ["Git Version Control, GitHub", "VS Code "] },
                { title: "AI Productivity Suite", items: [ "GitHub Copilot, LLM Prompting", "OpenAI APIs, Gemini Ecosystem"] },
                { title: "Professional Strengths", items: ["Complex Problem Solving", "Cross-functional Collaboration","Leadership"] }
              ].map((skillBlock) => (
                <motion.div 
                  key={skillBlock.title} 
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: "rgba(245, 158, 11, 0.3)", backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                  className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm"
                >
                  <h3 className="text-white font-bold text-base mb-4 tracking-wide flex items-center gap-2">
                    <span className="w-1 h-3 bg-amber-500 rounded-full" />
                    {skillBlock.title}
                  </h3>
                  <ul className="space-y-2.5 text-zinc-400 text-sm font-normal">
                    {skillBlock.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <FaCodeBranch className="text-zinc-600 text-xs" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="projects" className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Selected Production Artifacts</h2>
            <div className="h-1 w-10 bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:border-zinc-700/80 backdrop-blur-sm">
              <div className="relative h-44 overflow-hidden bg-zinc-950">
                <img src="../public/img/blackfriday.jpg" alt="E-commerce Portal" className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">Black Friday Enterprise Sale</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                  A high-traffic scalable e-commerce landing portal optimized for sudden volume spikes and instant flash dynamic pricing.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["React", "Node.js", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs font-medium bg-zinc-950 text-zinc-400 rounded-md border border-zinc-800">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-zinc-500 border-t border-zinc-800/80 pt-4 text-sm font-medium">
                  <a href="#" className="hover:text-white inline-flex items-center gap-1.5 transition-colors">Repository <FaGithub /></a>
                  <a href="#" className="hover:text-white inline-flex items-center gap-1.5 transition-colors">Live Demo <FaExternalLinkAlt className="text-xs" /></a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:border-zinc-700/80 backdrop-blur-sm">
              <div className="relative h-44 overflow-hidden bg-zinc-950">
                <img src="../public/img/aariyaprimix.png" alt="Management Portal" className="w-full h-full opacity-30 grayscale group-hover:opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">Aarya PowderPremix & Sips</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                A specialized B2B food-and-beverage engine supplying premium formulation inputs for the dessert, confectionery, and beverage sectors.</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["React", "Node.js", "Express", "MongoDB"].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs font-medium bg-zinc-950 text-zinc-400 rounded-md border border-zinc-800">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-zinc-500 border-t border-zinc-800/80 pt-4 text-sm font-medium">
                  <a href="#" className="hover:text-white inline-flex items-center gap-1.5 transition-colors">Repository <FaGithub /></a>
                  <a href="https://aaryapremixpowder.netlify.app/" className="hover:text-white inline-flex items-center gap-1.5 transition-colors">Live Demo <FaExternalLinkAlt className="text-xs" /></a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:border-zinc-700/80 backdrop-blur-sm">
              <div className="relative h-44 overflow-hidden bg-zinc-950">
                <img src="../public/img/viraevent.png" alt="Event Planning System" className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">Vira Architectural Event Planner</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                  Event layout engine managing resource dispatch calendars, structural order books, and real-time operational flows.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Django", "Python", "SQL"].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs font-medium bg-zinc-950 text-zinc-400 rounded-md border border-zinc-800">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-zinc-500 border-t border-zinc-800/80 pt-4 text-sm font-medium">
                  <a href="#" className="hover:text-amber-500 inline-flex items-center gap-1.5 transition-colors">Repository <FaGithub /></a>
                  <a href="https://viraevent-1.netlify.app/" className="hover:text-amber-500 inline-flex items-center gap-1.5 transition-colors">Live Demo <FaExternalLinkAlt className="text-xs" /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="experience" className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 border-t border-zinc-900/80 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-14"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Timeline & Background</h2>
            <div className="h-1 w-10 bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
                <RiBookShelfLine className="text-amber-500 text-lg" /> Professional Experience
              </div>
              <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20 hover:backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">Frontend Web Developer</h3>
                    <p className="text-sm text-amber-400 font-medium mt-0.5">Independent Contracting / Freelance</p>
                  </div>
                  <span className="text-xs font-mono bg-zinc-950 text-zinc-400 px-3 py-1 rounded-md border border-zinc-800 w-max">Remote</span>
                </div>
                <ul className="space-y-3.5 text-zinc-400 text-sm leading-relaxed">
                  <li className="flex gap-2"><span className="text-amber-500/70 font-bold">▪</span> Engineered fully responsive interface assets using React framework environments.</li>
                  <li className="flex gap-2"><span className="text-amber-500/70 font-bold">▪</span> Orchestrated collaborative design scopes alongside modern stakeholders to capture exact workflow specifications.</li>
                  <li className="flex gap-2"><span className="text-amber-500/70 font-bold">▪</span> Streamlined core client load operations reducing asset delay metrics.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
                <PiStudentBold className="text-indigo-400 text-lg" /> Academic Background
              </div>
              <div className="space-y-4">
                <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm hover:border-zinc-700/60 hover:shadow-lg hover:shadow-indigo-500/20 hover:backdrop-blur-md hover:scale-105 transition-transform duration-300">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">Credentialed 2026</span>
                  <h3 className="text-lg font-bold text-white mt-1.5">Diploma in Information Technology</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">Government Polytechnic, Kheda</p>
                </div>
                <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm hover:border-zinc-700/60 hover:shadow-lg hover:shadow-indigo-500/20 hover:backdrop-blur-md hover:scale-105 transition-transform duration-300">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">Specialist Practical Track</span>
                  <h3 className="text-lg font-bold text-white mt-1.5">Full Stack Web Engineering Track</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">TELENT Computer Institute of Technology, Ahmedabad</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="bg-zinc-950 py-24 text-center border-t border-zinc-900/80 relative z-10">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center mb-4"
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Initiate Alignment</h2>
              <div className="h-1 w-8 bg-amber-500 rounded-full" />
            </motion.div>

            <p className="text-zinc-400 text-sm sm:text-base max-w-md mb-10 leading-relaxed">
              Open to standard project placement pipelines, internships, or permanent assignments. Let's start the dialogue.
            </p>

            <div className="w-full max-w-lg space-y-4">
              <motion.a 
                href="mailto:parekhvaibhav2303@gmail.com"
                whileHover={{ scale: 1.01, filter: "brightness(1.05)" }} 
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/5 text-sm tracking-wider uppercase"
              >
                <FaEnvelope className="text-base" />
                <span>parekhvaibhav2303@gmail.com</span>
              </motion.a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <motion.a 
                  href="https://github.com" target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2, backgroundColor: "#18181b" }} 
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium rounded-xl transition-colors text-sm"
                >
                  <FaGithub className="text-zinc-400 text-base" /> <span>GitHub Profile</span>
                </motion.a>

                <motion.a 
                  href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2, backgroundColor: "#18181b" }} 
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium rounded-xl transition-colors text-sm"
                >
                  <FaLinkedin className="text-zinc-400 text-base" /> <span>LinkedIn Network</span>
                </motion.a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default App;