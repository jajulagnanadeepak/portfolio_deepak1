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
  AlertCircle
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          submitStatus === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {submitStatus === 'success' ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
          <span className="text-sm font-medium">{statusMessage}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Name</label>
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Your Name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Email</label>
        <input 
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Subject</label>
        <input 
          type="text" 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Project Inquiry"
        />
      </div>
      
      <div>
        <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>Message</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Tell me about your project..."
        ></textarea>
      </div>
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
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
          {/* Primary actions side-by-side */}
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
              <Download size={20} />
              Download Resume
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Get In Touch
            </button>
          </div>

          {/* Social icons below */}
          <div className="flex items-center gap-4">
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




      {/* About Section */}
      <section id="about" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
  <div className="max-w-6xl mx-auto px-6">
    
    {/* Heading */}
    <h2 className={`text-4xl font-extrabold text-center mb-4 transition-colors duration-300 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      About Me
    </h2>
    <p className={`text-lg text-center mb-16 transition-colors duration-300 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      I’m a passionate Full Stack Engineer who loves turning ideas into reality 
      through scalable, high-performance applications.
    </p>

    {/* Main Content */}
    <div className="grid md:grid-cols-3 gap-10 items-stretch">
      
      {/* Left Content */}
      <div className={`md:col-span-2 space-y-6 text-lg leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <p>
          My journey into technology began with curiosity about how the web works, 
          and today it has grown into a career where I combine <span className="italic">creativity</span> 
          and <span className="italic">engineering</span> to solve real-world problems.
        </p>
        <p>
          I specialize in technologies like           <span className="font-semibold text-blue-400">React</span>, 
          <span className="font-semibold text-blue-400">Node.js</span>, 
          <span className="font-semibold text-blue-400">Python</span>, and 
          <span className="font-semibold text-blue-400">Cloud-Native platforms</span>. 
          I enjoy building intuitive UIs, efficient APIs, and robust backend systems.
        </p>
        <p>
          Leveraging <span className="font-semibold text-blue-400">AWS</span>, 
          <span className="font-semibold text-blue-400">GCP</span>, and 
          <span className="font-semibold text-blue-400">containerization (Docker & Kubernetes)</span>, 
          I create scalable, cloud-ready applications that integrate 
          <span className="font-semibold"> data-driven insights</span> for smarter decision-making.
        </p>
        <p>
          I’m passionate about exploring <span className="font-semibold">cloud-native architectures</span>, 
          <span className="font-semibold"> distributed systems</span>, and 
          <span className="font-semibold"> AI-driven solutions</span>. Continuous learning drives me 
          to innovate and contribute to open-source communities.
        </p>
      </div>

      {/* Right Content - Truly Centered */}
      <div className="flex justify-center items-center h-full">
        <div className={`shadow-md rounded-xl p-6 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Experience</h3>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Full Stack Development Projects <br />
            <span className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>2+ years of hands-on experience</span>
          </p>
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
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Technical Skills</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Technologies and Tools I work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                  }`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <div key={index} className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
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
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Education & Certifications</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {education.map((edu, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                  }`}>
                    <BookOpen size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
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
      <section id="contact" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>Get In Touch</h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
      <p className={`text-xl transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>Let's discuss your next project</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* LEFT CONTENT */}
      <div className="space-y-10 mt-20">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <Mail size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Email</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>jajulagnanadeepak@gmai.com</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <Phone size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Phone</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>+91 7569701686</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <MapPin size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Location</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Rajumundry , Andhra Pradesh</p>
          </div>
        </div>

        <div className="pt-10">
          <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Follow Me</h3>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'
            }`}>
              <Linkedin size={24} className="text-blue-400" />
            </a>
            <a href="https://github.com/jajulagnanadeepak" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'
            }`}>
              <Github size={24} className="text-blue-400" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="w-full bg-blue-600 text-white rounded-lg py-5 px-6 text-center font-medium hover:bg-blue-700 transition-colors duration-200">
            <p className="text-base opacity-90">
              Open to new ideas, projects, and collaborations.
            </p>
            <p className="mt-1 text-xl font-semibold">
              Let’s build something amazing together
            </p>
          </div>
        </div>
      </div>

             {/* RIGHT CONTENT */}
       <ContactForm isDarkMode={isDarkMode} />
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