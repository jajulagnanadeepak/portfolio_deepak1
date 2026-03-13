import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Code,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Download,
  Award,
  BookOpen,
  ChevronUp,
  Sun,
  Moon,
  Send,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Cloud,
  GitBranch,
  Boxes,
  Globe,
  Zap,
  Rocket,
  FileText,
  Layers,
  Workflow,
  Container,
  Cpu,
  Terminal
} from 'lucide-react';

const API_BASE: string = ((import.meta as any).env?.VITE_API_BASE || 'https://portfolio-back-hdau.onrender.com').replace(/\/$/, '');

// Use the image placed in `public/photo.webp` so Vite serves it from the root
const profileImage = '/photo.webp';

// Custom MongoDB Icon Component
const MongoDBIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    {/* MongoDB Leaf Logo */}
    <path
      d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-7.59-.338-.18-.53-.252-.53-.252s-.192.072-.53.252c-.32.176-3.309 2.01-4.573 7.59-1.496 6.596.667 9.33.667 9.33s.667.252.667.252.667-.252.667-.252c0 0 2.163-2.734.667-9.33z"
      fill="#4DB33D"
    />
    <path
      d="M12.667 18.885c0 .252-.192.252-.192.252s-.192 0-.192-.252c0-.252.192-.252.192-.252s.192 0 .192.252z"
      fill="#4DB33D"
    />
    <path
      d="M12.475 18.885c0 .252-.192.252-.192.252s-.192 0-.192-.252c0-.252.192-.252.192-.252s.192 0 .192.252z"
      fill="#4DB33D"
    />
  </svg>
);


interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

interface Certification {
  name: string;
  issuer: string;
  url: string;
  imageUrl?: string;
}

// Contact Form Component
const ContactForm: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_BASE}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.msg || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Message */}
      {submitStatus !== 'idle' && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${submitStatus === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
          {submitStatus === 'success' ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
          <span className="text-sm font-medium">{statusMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${isDarkMode
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500'
                : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
              }`}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${isDarkMode
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500'
                : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
              }`}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${isDarkMode
              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500'
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
            }`}
          placeholder="Project Inquiry"
        />
      </div>

      <div>
        <label htmlFor="message" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Project Details</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 ${isDarkMode
              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500'
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
            }`}
          placeholder="Tell me about your project goals, timeline, and any specific requirements..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 ${isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg active:from-blue-700 active:to-purple-700 active:shadow-xl'
          }`}
        style={{
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          transform: 'none',
          willChange: 'auto'
        }}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Sending Message...
          </>
        ) : (
          <>
            <Send size={22} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for changes in localStorage to update projects
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('adminProjects');
      if (saved) {
        setProjects(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check for changes when the component mounts
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for changes in localStorage to update certifications
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('adminCertifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Add imageUrl if missing for existing certifications
        const imageMap: { [key: string]: string } = {
          'AWS Certified Developer Associate': '/aws.webp',
          'Google Cloud Professional Developer': '/orl.webp',
          'MongoDB Certified Developer': '/db.webp',
          'AWS Certified practitioner': '/orl.webp',
          'Oracle Cloud Associate': '/ava.webp'
        };
        const updated = parsed.map((cert: any) => ({
          ...cert,
          imageUrl: cert.imageUrl || imageMap[cert.name] || ''
        }));
        setCertifications(updated);
        // Save updated certifications back to localStorage if they were missing imageUrl
        const needsUpdate = parsed.some((cert: any) => !cert.imageUrl && imageMap[cert.name]);
        if (needsUpdate) {
          localStorage.setItem('adminCertifications', JSON.stringify(updated));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check for changes when the component mounts
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const skills = [
    { name: 'JavaScript', icon: FileText, level: 'Advanced' },
    { name: 'CI/CD', icon: Workflow, level: 'Advanced' },
    { name: 'React.js', icon: Layers, level: 'Advanced' },
    { name: 'Node.js', icon: Terminal, level: 'Intermediate' },
    { name: 'Python', icon: Cpu, level: 'Advanced' },
    { name: 'DSA', icon: Code, level: 'Intermediate' },
    { name: 'Docker', icon: Container, level: 'Intermediate' },
    { name: 'App Dev', icon: MongoDBIcon, level: 'Intermediate' }
  ];

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('adminProjects');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default projects
    return [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
        liveUrl: '/demo/ecommerce',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
    ];
  });

  const education = [
    {
      degree: 'High School Education',
      institution: 'IISJ School',
      year: '2013-2018',
      description: 'Built a good academic base by learning core subjects like maths, science, and languages. Developed discipline and curiosity that helped me grow in later studies.',
      image: '/iisj.webp'
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'TechAcademy',
      year: '2018-2021',
      description: 'Completed Upper class with focus on science and mathematics. Strengthened analytical skills and developed interest in technology.',
      image: '/bvb.webp'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'KL University Of Technology',
      year: '2023-2027',
      description: 'Currently pursuing B.Tech in Computer Science, focusing on software development and cloud technologies through practical projects.',
      image: '/KL-University.webp'
    }
  ];

  const [certifications, setCertifications] = useState(() => {
    const saved = localStorage.getItem('adminCertifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Add imageUrl if missing for existing certifications
      const imageMap: { [key: string]: string } = {
        'AWS Certified Developer Associate': '/aws.webp',
        'Google Cloud Professional Developer': '/orl.webp',
        'MongoDB Certified Developer': '',
        'AWS Certified practitioner': '/orl.webp',
        'Oracle Cloud Associate': '/ava.webp'
      };
      return parsed.map((cert: any) => ({
        ...cert,
        imageUrl: cert.imageUrl || imageMap[cert.name] || ''
      }));
    }
    // Default certifications
    return [
      { name: 'AWS Certified Developer Associate', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-badge-id/public_url', imageUrl: '/aws.webp' },
      { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', url: 'https://www.credly.com/badges/your-gcp-badge-id/public_url', imageUrl: '/orl.webp' },
      { name: 'MongoDB Certified Developer', issuer: 'MongoDB', url: 'https://www.credly.com/badges/your-mongodb-badge-id/public_url', imageUrl: '/db.webp' },
      { name: 'AWS Certified practitioner', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-practitioner-badge-id/public_url', imageUrl: '/orl.webp' },
      { name: 'Oracle Cloud Associate', issuer: 'Oracle', url: 'https://www.credly.com/badges/your-oracle-badge-id/public_url', imageUrl: '/ava.webp' }
    ];
  });

  const [failedImages, setFailedImages] = React.useState<string[]>([]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900'
      }`}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-slate-900'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              {/* Logo / brand - improved creative design using Rubik (loaded in index.html) */}
              <div className="flex items-center gap-3">
                <img
                  src="/logopf.webp"
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
                <div className="leading-tight">
                  <div style={{ fontFamily: "'Rubik', sans-serif" }} className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                    J G Deepak
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wider">Portfolio</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'education', label: 'Education' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${activeSection === item.id
                        ? 'text-blue-400 bg-slate-800'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle and Mobile menu button */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                    ? 'text-yellow-400 hover:bg-gray-700'
                    : 'text-gray-300 hover:bg-slate-800'
                  }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white p-2"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`pt-16 min-h-screen flex items-center transition-colors duration-300 relative overflow-hidden ${isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div className="space-y-5 order-2 lg:order-1" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
              <div className="space-y-3">
                <h1 className={`text-3xl lg:text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    J G Deepak
                  </span>
                </h1>
                <h2 className={`text-lg lg:text-xl font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Full Stack Engineer
                  </span>
                  <span className="text-lg">|</span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Cloud-Native
                  </span>
                  <span className="text-lg">|</span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Python Problem Solving
                  </span>
                </h2>
              </div>

              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`} style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
                <span className="font-semibold">
                  I create scalable applications that combine user-friendly design and clean code. I enjoy experimenting with new technologies and creating solutions of development and innovation. I am proficient in full-stack development, Python, and cloud-native platforms.
                </span>
              </p>

              {/* Enhanced Buttons */}
              <div className="flex flex-col gap-5 sm:gap-6" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
                <div className="flex flex-col-reverse md:flex-row items-start gap-6 flex-wrap">
                  <div className="flex flex-col items-start group">
                    <a href="/Resume_Deepak.pdf" download>
                      <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl shadow-lg">
                        <Download size={16} />
                        Download Resume
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </a>

                    <div className="flex items-center gap-3 mt-3">
                      <a
                        href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <Linkedin size={20} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                      <a
                        href="https://github.com/jajulagnanadeepak"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <Github size={20} className="text-gray-600 group-hover:text-gray-700 transition-colors" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-400/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl shadow-lg no-hover-scale"
                    >
                      <Mail size={18} />
                      Get In Touch
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Main profile container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  {/* Inner white circle */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 -right-6 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* About Section - Professional Story */}
      <section
        id="about"
        className={`py-16 transition-colors duration-300 relative overflow-hidden ${isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
          }`}
      >
        {/* Background Glows */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-32 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div
            className="absolute bottom-32 left-32 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Title */}
          <div className="text-center mb-14">
            <div className="inline-block">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Know Me
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>

            <p
              className={`text-lg max-w-2xl mx-auto mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              A passionate developer turning ideas into production-ready applications
              with cloud-native, DevOps, and scalable engineering practices.
            </p>
          </div>


          {/* 3-Card Journey */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Python Card */}
            <div
              className={`rounded-2xl p-8 shadow-xl border backdrop-blur-lg hover:scale-105 transition-transform duration-500 ${isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700"
                  : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/30"
                }`}
              style={{ animation: "fadeInUp 0.8s ease-out" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-blue-600" size={26} />
                <h3
                  className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent`}
                >
                  Python Foundation
                </h3>
              </div>

              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
              >
                I began learning Python to learn automation, logic construction, and the fundamentals of programming.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-medium">
                  Python
                </span>
                <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-medium">
                  Problem Solving
                </span>
                <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-medium">
                  Automation
                </span>
              </div>
            </div>

            {/* JavaScript Full Stack Learning Card */}
            <div
              className={`rounded-2xl p-8 shadow-xl border backdrop-blur-lg hover:scale-105 transition-transform duration-500 ${isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700"
                  : "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/30"
                }`}
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-purple-600" size={26} />
                <h3
                  className={`text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent`}
                >
                  JavaScript to Full Stack
                </h3>
              </div>

              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
              >
                Learned JavaScript in order to create dynamic web applications. I was able to advance towards full-stack development using contemporary tools thanks to this phase.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-medium">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-medium">
                  Full Stack Learning
                </span>
                <span className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-medium">
                  Web Dev
                </span>
              </div>
            </div>

            {/* Cloud, DevOps & Kubernetes Card */}
            <div
              className={`rounded-2xl p-8 shadow-xl border backdrop-blur-lg hover:scale-105 transition-transform duration-500 ${isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700"
                  : "bg-gradient-to-br from-green-50 to-green-100 border-green-200/30"
                }`}
              style={{ animation: "fadeInUp 0.8s ease-out 0.6s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-green-600" size={26} />
                <h3
                  className={`text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent`}
                >
                  Cloud, DevOps & Kubernetes
                </h3>
              </div>

              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
              >
                Utilising cloud-native technologies to create automated, containerised, and scalable infrastructure. knowledgeable about DevOps culture, CI/CD pipelines, and Kubernetes.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs font-medium">
                  Cloud
                </span>
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs font-medium">
                  DevOps
                </span>
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs font-medium">
                  Kubernetes
                </span>
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs font-medium">
                  CI/CD
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills" className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with enhanced styling */}
          <div className="text-center mb-14">
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Technical Skills
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
          </div>

          {/* Enhanced Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                  }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400/20 to-blue-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

                {/* Skill content */}
                <div className="relative p-6">
                  {/* Smaller, polished icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl p-1 transition-all duration-500 group-hover:scale-110 ${isDarkMode
                        ? 'bg-gradient-to-br from-blue-900/60 to-purple-900/60 border border-blue-700/40 shadow-lg'
                        : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-md'
                      }`}>
                      {skill.name === 'MongoDB' ? (
                        <MongoDBIcon size={16} className="text-green-500 group-hover:text-green-400 transition-colors duration-300" />
                      ) : (
                        <skill.icon size={16} className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
                      )}
                      {/* Subtle glow */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.08), transparent)' }} />
                    </div>
                  </div>

                  {/* Skill name only (no percentage/level) */}
                  <div className="text-center">
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {skill.name}
                    </h3>
                    {/* Optional short tagline for visual polish (kept neutral) */}
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-16 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
        }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-14" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Experience
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Experience Card 1 */}
            <div
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                  : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                }`}
              style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating particles effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400/20 to-blue-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                      ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/50'
                      : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/50'
                    }`}>
                    <Briefcase className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300" size={24} />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Full Stack Developer</h3>
                    <p className="text-blue-500 font-semibold text-sm">Projects • 1+ years</p>
                  </div>
                </div>

                <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Building delightful product experiences across frontend and backend with a focus on performance and reliability.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'JavaScript', 'Tailwind', 'TypeScript'].map((tag, index) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${isDarkMode
                          ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-blue-200 hover:from-blue-800 hover:to-purple-800'
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200'
                        }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2 group-hover:text-blue-500 transition-colors duration-300">
                    <Zap size={16} className="text-blue-400 mt-1 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm">Delivered full-stack features from UI to deployment.</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-purple-500 transition-colors duration-300">
                    <Zap size={16} className="text-blue-400 mt-1 group-hover:text-purple-500 transition-colors" />
                    <span className="text-sm">Optimized frontend performance and accessibility.</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-pink-500 transition-colors duration-300">
                    <Zap size={16} className="text-blue-400 mt-1 group-hover:text-pink-500 transition-colors" />
                    <span className="text-sm">Engineered REST APIs, auth, and backend workflows.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                  : 'bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border border-gray-200'
                }`}
              style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating particles effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                      ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/50'
                    }`}>
                    <Cloud className="text-purple-500 group-hover:text-pink-500 transition-colors duration-300" size={24} />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cloud & DevOps</h3>
                    <p className="text-purple-500 font-semibold text-sm">AWS/GCP & CI/CD •  6-month learning experience</p>
                  </div>
                </div>

                <p className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enabling reliable delivery through automation, observability, and cloud-native architectures.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'].map((tag, index) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${isDarkMode
                          ? 'bg-gradient-to-r from-purple-900 to-pink-900 text-purple-200 hover:from-purple-800 hover:to-pink-800'
                          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'
                        }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2 group-hover:text-purple-500 transition-colors duration-300">
                    <GitBranch size={16} className="text-purple-400 mt-1 group-hover:text-purple-500 transition-colors" />
                    <span className="text-sm">Built CI/CD pipelines, reduced release friction and lead time.</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-pink-500 transition-colors duration-300">
                    <Boxes size={16} className="text-purple-400 mt-1 group-hover:text-pink-500 transition-colors" />
                    <span className="text-sm">Containerized services; improved portability and scalability.</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-blue-500 transition-colors duration-300">
                    <Zap size={16} className="text-purple-400 mt-1 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm">Implemented monitoring and alerts to maintain uptime.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-16 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
        }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-14" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Featured Projects
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project: Project, index: number) => (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                  }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'fadeInUp 0.8s ease-out both'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400/20 to-blue-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

                {/* Project Image */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="relative p-6">
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {project.title}
                  </h3>

                  <p className={`mb-4 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${isDarkMode
                            ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-blue-200 hover:from-blue-800 hover:to-purple-800'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200'
                          }`}
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl.startsWith('/demo/') ? (
                      <Link
                        to={project.liveUrl}
                        className="group/link relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    ) : (
                      <a
                        href={project.liveUrl}
                        className="group/link relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      className={`group/link relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode
                          ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                        }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      Source Code
                      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ${isDarkMode
                          ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20'
                          : 'bg-gradient-to-r from-gray-300/20 to-gray-400/20'
                        }`}></div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-16 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
        }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-14" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Education & Certifications
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
          </div>

          {/* Education Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out', animationDelay: `${index * 0.2}s` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400/20 to-blue-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

                {/* Image in upper half */}
                {edu.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                        ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/50'
                        : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/50'
                      }`}>
                      <BookOpen className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300" size={24} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {edu.degree}
                      </h3>
                      <p className="text-blue-500 font-semibold text-base mb-1">{edu.institution}</p>
                      <p className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {edu.year}
                      </p>
                      <p className={`text-base leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isDarkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                : 'bg-gradient-to-br from-white via-yellow-50 to-orange-50 shadow-xl border border-gray-200'
              }`}
            style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating particles effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 blur-3xl hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-red-400/20 to-yellow-400/20 blur-2xl hover:scale-125 transition-transform duration-700"></div>

            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`relative p-3 rounded-xl transition-all duration-500 hover:scale-110 hover:rotate-3 ${isDarkMode
                    ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-yellow-700/50'
                    : 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200/50'
                  }`}>
                  <Award className="text-yellow-500 hover:text-orange-500 transition-colors duration-300" size={28} />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    Professional Certifications
                  </h3>
                  <p className={`text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    Industry-recognized credentials and achievements
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert: Certification, index: number) => (
                  <div
                    key={index}
                    className={`group/cert relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode
                        ? 'bg-gradient-to-r from-yellow-900/50 to-orange-900/50 hover:from-yellow-800/50 hover:to-orange-800/50 border border-yellow-700/30'
                        : 'bg-gradient-to-r from-yellow-100/50 to-orange-100/50 hover:from-yellow-200/50 hover:to-orange-200/50 border border-yellow-200/30'
                      }`}
                    style={{ animation: 'fadeInUp 0.8s ease-out', animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 group-hover/cert:scale-110 ${isDarkMode ? 'bg-yellow-800/50' : 'bg-yellow-200/50'
                      }`}>
                      {cert.imageUrl && cert.imageUrl.trim() !== '' && !failedImages.includes(cert.name) ? (
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
                          className="w-8 h-8 object-contain"
                          onError={() => setFailedImages(prev => prev.includes(cert.name) ? prev : [...prev, cert.name])}
                        />
                      ) : cert.name && cert.name.toLowerCase().includes('mongodb') ? (
                        <Terminal size={20} className="text-green-500" />
                      ) : (
                        <Award size={16} className="text-yellow-500 group-hover/cert:text-orange-500 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base font-semibold transition-colors duration-200 hover:text-blue-500 ${isDarkMode
                            ? 'text-yellow-100 hover:text-blue-300'
                            : 'text-gray-800 hover:text-blue-600'
                          }`}
                      >
                        {cert.name}
                      </a>
                      <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-yellow-200' : 'text-gray-500'
                        }`}>
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={14} className="text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-14" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Get In Touch
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Info Cards */}
            <div className="h-full flex flex-col justify-between space-y-6">
              {/* Email Card */}
              <div
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                        ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/50'
                        : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/50'
                      }`}>
                      <Mail className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300" size={20} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drop me a line</p>
                    </div>
                  </div>
                  <a
                    href="mailto:jajulagnanadeepak@gmail.com"
                    className={`text-sm font-semibold transition-colors duration-300 group-hover:text-blue-500 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}
                  >
                    jajulagnanadeepak@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-green-50 to-emerald-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                        ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-700/50'
                        : 'bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200/50'
                      }`}>
                      <Phone className="text-green-500 group-hover:text-emerald-500 transition-colors duration-300" size={20} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Let's talk</p>
                    </div>
                  </div>
                  <a
                    href="tel:+917569701686"
                    className={`text-sm font-semibold transition-colors duration-300 group-hover:text-green-500 ${isDarkMode ? 'text-green-300' : 'text-green-600'
                      }`}
                  >
                    +91 7569701686
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                        ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50'
                        : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/50'
                      }`}>
                      <MapPin className="text-purple-500 group-hover:text-pink-500 transition-colors duration-300" size={20} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based in</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold transition-colors duration-300 group-hover:text-purple-500 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>
                    Rajahmundry, Andhra Pradesh
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-orange-50 to-yellow-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                        ? 'bg-gradient-to-br from-orange-900/50 to-yellow-900/50 border border-orange-700/50'
                        : 'bg-gradient-to-br from-orange-100 to-yellow-100 border border-orange-200/50'
                      }`}>
                      <Globe className="text-orange-500 group-hover:text-yellow-500 transition-colors duration-300" size={20} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connect</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Social links</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/social relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${isDarkMode
                          ? 'bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                        }`}
                    >
                      <Linkedin size={20} className="text-white" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <a
                      href="https://github.com/jajulagnanadeepak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/social relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${isDarkMode
                          ? 'bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900'
                          : 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                        }`}
                    >
                      <Github size={20} className="text-white" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600'
                    : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
                  }`}
                style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400/20 to-blue-400/20 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative p-6 h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode
                          ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/50'
                          : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/50'
                        }`}>
                        <Send className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300" size={24} />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Send a Message
                        </h3>
                        <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Let's discuss your project
                        </p>
                      </div>
                    </div>
                  </div>
                  <ContactForm isDarkMode={isDarkMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-slate-900'
        } text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">J G Deepak</h3>
              <p className={`mb-4 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-300'
                }`}>
                💻 Full Stack Developer | Cloud Native Engineer | Python Coding Programmer.
                Driven to create impactful, future-ready digital experiences.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}>
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/jajulagnanadeepak" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}>
                  <Github size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Approch</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-white transition-colors">Projects</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Web Development</li>
                <li>Cloud Native</li>
                <li>Python Coding</li>
                <li>Marketing Analytics</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Design</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/design" className="text-gray-300 hover:text-white transition-colors">
                    Portfolio Architecture
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 J G Deepak. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex gap-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">FAQs</a>
              <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;