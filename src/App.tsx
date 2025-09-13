import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Code, 
  Database, 
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
  Server,
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
  Rocket
} from 'lucide-react';
import profileImage from '../assets/photo.png';


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
      const response = await fetch('http://localhost:5000/send-message', {
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
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          submitStatus === 'success' 
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
          <label htmlFor="name" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Full Name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500' 
                : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
            }`}
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500' 
                : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
            }`}
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Subject</label>
        <input 
          type="text" 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500' 
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
          }`}
          placeholder="Project Inquiry"
        />
      </div>
      
      <div>
        <label htmlFor="message" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Project Details</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500' 
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 hover:border-gray-300'
          }`}
          placeholder="Tell me about your project goals, timeline, and any specific requirements..."
        ></textarea>
      </div>
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
          isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
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
        setCertifications(JSON.parse(saved));
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
    { name: 'JavaScript', icon: Code, level: 'Advanced' },
    { name: 'CI/CD', icon: Server, level: 'Advanced' },
    { name: 'React.js', icon: Code, level: 'Advanced' },
    { name: 'Node.js', icon: Database, level: 'Intermediate' },
    { name: 'Python', icon: Code, level: 'Advanced' },
    { name: 'DSA', icon: Code, level: 'Intermediate' },
    { name: 'Docker', icon: Server, level: 'Intermediate' },
    { name: 'MongoDB', icon: Database, level: 'Intermediate' }
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
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
        liveUrl: '/demo/taskmanager',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Weather Analytics Dashboard',
        description: 'A data visualization dashboard that displays weather patterns and analytics using third-party APIs and interactive charts.',
        technologies: ['Vue.js', 'Chart.js', 'Weather API', 'Tailwind CSS'],
        liveUrl: '/demo/weather',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ];
  });

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'KL University Of Technology',
      year: '2023-2027',
      description: 'Specialized in software engineering and web development with a focus on modern technologies and agile methodologies.'
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'TechAcademy',
      year: '2026',
      description: 'Intensive 3-month program covering MERN stack, database design, and deployment strategies.'
    }
  ];

  const [certifications, setCertifications] = useState(() => {
    const saved = localStorage.getItem('adminCertifications');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default certifications
    return [
      { name: 'AWS Certified Developer Associate', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-badge-id/public_url' },
      { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', url: 'https://www.credly.com/badges/your-gcp-badge-id/public_url' },
      { name: 'MongoDB Certified Developer', issuer: 'MongoDB', url: 'https://www.credly.com/badges/your-mongodb-badge-id/public_url' },
      { name: 'AWS Certified practitioner', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-practitioner-badge-id/public_url' }
    ];
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
        {/* Sticky Navigation */}
        <nav className={`fixed top-0 w-full backdrop-blur-md z-50 shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-slate-900'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-white">Portfolio</h1>
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
                      className={`px-3 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === item.id 
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
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
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
        <section id="home" className={`pt-16 min-h-screen flex items-center transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600' 
            : 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'
        }`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="space-y-8 order-2 lg:order-1">
        <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-blue-400">J G Deepak</span>
        </h1>
        <h2 className={`text-2xl lg:text-3xl font-medium flex items-center gap-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
        Full Stack Engineer | Cloud & Analytics
        </h2>

        <p className={`text-lg leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <span className="font-bold">
        I craft scalable applications that blend clean code with user-friendly design.
        Skilled in full-stack development, Python, and cloud-native platforms, I thrive on experimenting with new technologies and building solutions that inspire growth and innovation.
        </span>
        </p>

        {/* Buttons + Icons Below */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Primary actions side-by-side with icons beneath each */}
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex flex-col items-start">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Download size={20} />
                Download Resume
              </button>
              <div className="flex items-center gap-4 mt-2">
                <a 
                  href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Linkedin size={24} className="text-blue-600" />
                </a>
                <a 
                  href="https://github.com/jajulagnanadeepak" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Github size={24} className="text-blue-600" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={20} />
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex justify-center lg:justify-end order-1 lg:order-2">
  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-white rounded-full flex items-center justify-center overflow-hidden">
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

    </div>
  </div>
</section>




      {/* About Section - Journey Timeline */}
      <section id="about" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-medium tracking-tight`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Know Me
              </span>
            </h2>
            <p className={`mt-3 text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Every line of code tells a story. Myself - a journey of discovery, growth, and build.
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {/* 2022 - Learning Phase */}
              <div className="relative flex items-start gap-6">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-full border-4 border-blue-500 shadow-lg z-10`}>
                  <BookOpen className="text-blue-500" size={20} />
                </div>
                <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-blue-500">2022</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    The Beginning
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    Started with curiosity about how websites work. Built my first HTML page and fell in love with turning ideas into reality through code.
                  </p>
                </div>
              </div>

              {/* 2023 - Growth Phase */}
              <div className="relative flex items-start gap-6">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-full border-4 border-purple-500 shadow-lg z-10`}>
                  <Code className="text-purple-500" size={20} />
                </div>
                <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-purple-500">2023</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Deep Learning
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    Mastered JavaScript, explored React, and built full-stack applications. Every bug was a lesson, every feature a victory.
                  </p>
                </div>
              </div>

              {/* 2024+ - Mastery Phase */}
              <div className="relative flex items-start gap-6">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-full border-4 border-green-500 shadow-lg z-10`}>
                  <Rocket className="text-green-500" size={20} />
                </div>
                <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-green-500">2024+</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-green-500 to-transparent"></div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Crafting Excellence
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    Focused on cloud platforms, performance optimization, and clean architecture. Building production-ready applications and exploring AI integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-medium mb-4`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Technologies and Tools I work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg' : 'bg-gradient-to-br from-white to-blue-50 shadow-lg'
              }`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-xl mr-4`}>
                      <skill.icon size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{skill.name}</h3>
                      <p className="text-sm text-blue-400 font-medium">{skill.level}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-medium mb-4`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Professional journey and key responsibilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience Card 1 */}
            <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg' : 'bg-gradient-to-br from-white to-blue-50 shadow-lg'
            }`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-xl`}>
                    <Briefcase className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Full Stack Developer</h3>
                    <p className="text-blue-400 font-medium">Projects & Freelance • 2+ years</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  Building delightful product experiences across frontend and backend with a focus on performance and reliability.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['React', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB'].map((tag) => (
                    <span key={tag} className={`${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-sm font-medium`}>{tag}</span>
                  ))}
                </div>
                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2"><Zap size={16} className="text-blue-400 mt-1" /> Shipped features end-to-end from UX to deployment.</li>
                  <li className="flex items-start gap-2"><Zap size={16} className="text-blue-400 mt-1" /> Built accessible, responsive UIs and optimized bundle size.</li>
                  <li className="flex items-start gap-2"><Zap size={16} className="text-blue-400 mt-1" /> Designed REST APIs and integrated databases with auth.</li>
                </ul>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg' : 'bg-gradient-to-br from-white to-blue-50 shadow-lg'
            }`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-xl`}>
                    <Cloud className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cloud & DevOps</h3>
                    <p className="text-blue-400 font-medium">AWS/GCP & CI/CD • 2+ years</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  Enabling reliable delivery through automation, observability, and cloud-native architectures.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'].map((tag) => (
                    <span key={tag} className={`${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-sm font-medium`}>{tag}</span>
                  ))}
                </div>
                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2"><GitBranch size={16} className="text-blue-400 mt-1" /> Built CI/CD pipelines, reduced release friction and lead time.</li>
                  <li className="flex items-start gap-2"><Boxes size={16} className="text-blue-400 mt-1" /> Containerized services; improved portability and scalability.</li>
                  <li className="flex items-start gap-2"><Zap size={16} className="text-blue-400 mt-1" /> Implemented monitoring and alerts to maintain uptime.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-medium mb-4`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <div key={index} className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg' : 'bg-gradient-to-br from-white to-blue-50 shadow-lg'
              }`}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{project.title}</h3>
                  <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-blue-900 text-blue-200' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.liveUrl.startsWith('/demo/') ? (
                      <Link 
                        to={project.liveUrl}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </Link>
                    ) : (
                      <a 
                        href={project.liveUrl}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    <a 
                      href={project.githubUrl}
                      className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-medium mb-4`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Education & Certifications
              </span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {education.map((edu, index) => (
              <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg' : 'bg-gradient-to-br from-white to-blue-50 shadow-lg'
              }`}>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex flex-col items-center sm:min-w-[56px]">
                    <div className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-xl transition-colors duration-300`}>
                      <BookOpen size={24} className="text-blue-400" />
                    </div>
                    <p className={`mt-2 text-xs italic text-center leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      From schooling to intermediate, I learned fast, built strong
                      fundamentals, and kept improving with curiosity and grit.
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{edu.degree}</h3>
                    <p className="text-blue-400 font-semibold mb-2">{edu.institution}</p>
                    <p className={`font-medium mb-3 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{edu.year}</p>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-8 rounded-xl shadow-md transition-all duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <Award size={28} className="text-yellow-500" />
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Professional Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert: Certification, index: number) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isDarkMode ? 'bg-yellow-900 hover:bg-yellow-800' : 'bg-yellow-50 hover:bg-yellow-100'
                }`}>
                  <Award size={16} className="text-yellow-500" />
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium flex-1 transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-yellow-100 hover:text-blue-300' 
                        : 'text-gray-800 hover:text-blue-600'
                    }`}
                  >
                    {cert.name}
                  </a>
                  <span className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-yellow-200' : 'text-gray-500'
                  }`}>{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 transition-colors duration-300 ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-medium mb-6`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a project in mind? Let's discuss it Here:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="h-full flex flex-col justify-between space-y-4">
              {/* Email Card */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 border-l-4 border-blue-500`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} p-3 rounded-lg shadow-lg`}>
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drop me a line</p>
                  </div>
                </div>
                <a href="mailto:jajulagnanadeepak@gmail.com" className={`text-blue-500 hover:text-blue-600 font-medium transition-colors`}>
                  jajulagnanadeepak@gmail.com
                </a>
              </div>

              {/* Phone Card */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 border-l-4 border-green-500`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${isDarkMode ? 'bg-gradient-to-br from-green-600 to-green-800' : 'bg-gradient-to-br from-green-500 to-green-600'} p-3 rounded-lg shadow-lg`}>
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Let's talk</p>
                  </div>
                </div>
                <a href="tel:+917569701686" className={`text-green-500 hover:text-green-600 font-medium transition-colors`}>
                  +91 7569701686
                </a>
              </div>

              {/* Location Card */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 border-l-4 border-purple-500`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-purple-500 to-purple-600'} p-3 rounded-lg shadow-lg`}>
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based in</p>
                  </div>
                </div>
                <p className={`text-purple-500 font-medium`}>
                  Rajahmundry, Andhra Pradesh
                </p>
              </div>

              {/* Social Links */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg flex-1 border-l-4 border-orange-500`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${isDarkMode ? 'bg-gradient-to-br from-orange-600 to-orange-800' : 'bg-gradient-to-br from-orange-500 to-orange-600'} p-3 rounded-lg shadow-lg`}>
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connect</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Social links</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900' : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg`}>
                    <Linkedin size={20} className="text-white" />
                  </a>
                  <a href="https://github.com/jajulagnanadeepak" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900' : 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'} p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg`}>
                    <Github size={20} className="text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl h-full`}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} p-3 rounded-xl shadow-lg`}>
                      <Send className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Send a Message
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
      </section>

      {/* Footer */}
      <footer className={`py-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-slate-900'
      } text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">J G Deepak</h3>
              <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-300'
              }`}>
              💻 Full Stack Developer | Cloud Native Engineer | Python Coding Programmer.
              Driven to create impactful, future-ready digital experiences.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-300 hover:text-blue-400'
                }`}>
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/jajulagnanadeepak" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-300 hover:text-blue-400'
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