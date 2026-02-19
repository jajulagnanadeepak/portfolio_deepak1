import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Layers, 
  Terminal, 
  Cloud, 
  FileText, 
  Container,
  ArrowLeft
} from 'lucide-react';

// Custom MongoDB Icon Component
const MongoDBIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    fill="none"
  >
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

const Architecture = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Listen for dark mode changes from the main App
  React.useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      setIsDarkMode(saved ? JSON.parse(saved) : false);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Architecture Diagram Section */}
      <section className={`py-16 transition-colors duration-300 relative overflow-hidden mt-16 ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
      }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-14" style={{animation: 'fadeInUp 0.8s ease-out'}}>
            <div className="inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Portfolio Architecture
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </h2>
            </div>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              System design and deployment overview
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl border border-gray-600' 
              : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border border-gray-200'
          }`}>
            <div className="p-6 md:p-8">
              {/* Architecture Flow */}
              <div className="space-y-6">
                {/* Frontend */}
                <div className={`group relative rounded-2xl p-5 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50' 
                    : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? 'bg-blue-800/50' : 'bg-blue-200/50'
                    }`}>
                      <Layers className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Frontend
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        React + TypeScript + Vite
                      </p>
                    </div>
                  </div>
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    React and TypeScript were used to create a contemporary, responsive user interface. Dynamic routing, state management, and enhanced performance with Vite bundling are among the features. Tailwind CSS was used to create a consistent, lovely design experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'].map((tool) => (
                      <span key={tool} className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? 'bg-blue-800/50 text-blue-200' 
                          : 'bg-blue-200 text-blue-700'
                      }`}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow/Connection */}
                <div className="flex justify-center">
                  <div className={`w-1 h-12 rounded-full ${
                    isDarkMode ? 'bg-gradient-to-b from-blue-500 to-green-500' : 'bg-gradient-to-b from-blue-400 to-green-400'
                  }`}></div>
                </div>

                {/* Backend */}
                <div className={`group relative rounded-2xl p-5 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-green-900/50 to-teal-900/50 border border-green-700/50' 
                    : 'bg-gradient-to-r from-green-100 to-teal-100 border border-green-200/50'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? 'bg-green-800/50' : 'bg-green-200/50'
                    }`}>
                      <Terminal className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Backend
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Node.js + Express + MongoDB
                      </p>
                    </div>
                  </div>
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Express and Node.js were used to create this RESTful API server. manages business logic, data processing, and authentication. User information, projects, and certifications are stored in a MongoDB database. JWT authentication and OTP verification provide secure API endpoints. 
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'].map((tool) => (
                      <span key={tool} className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? 'bg-green-800/50 text-green-200' 
                          : 'bg-green-200 text-green-700'
                      }`}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow/Connection */}
                <div className="flex justify-center">
                  <div className={`w-1 h-12 rounded-full ${
                    isDarkMode ? 'bg-gradient-to-b from-green-500 to-orange-500' : 'bg-gradient-to-b from-green-400 to-orange-400'
                  }`}></div>
                </div>

                {/* Deployment */}
                <div className={`group relative rounded-2xl p-5 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-700/50' 
                    : 'bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200/50'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? 'bg-orange-800/50' : 'bg-orange-200/50'
                    }`}>
                      <Cloud className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Deployment
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Cloud Hosting + CI/CD
                      </p>
                    </div>
                  </div>
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Frontend is built automatically from Git and deployed on Vercel. Cloud platform such as AWS are used to host. Pipelines for continuous integration and deployment guarantee smooth updates.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Vercel', 'AWS', 'Docker', 'Git', 'CI/CD'].map((tool) => (
                      <span key={tool} className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? 'bg-orange-800/50 text-orange-200' 
                          : 'bg-orange-200 text-orange-700'
                      }`}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools Badges Section */}
              <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <h4 className={`text-xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technology Stack
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'React', icon: Layers, color: 'blue' },
                    { name: 'TypeScript', icon: FileText, color: 'blue' },
                    { name: 'Node.js', icon: Terminal, color: 'green' },
                    { name: 'MongoDB', icon: MongoDBIcon, color: 'green' },
                    { name: 'AWS', icon: Cloud, color: 'orange' },
                    { name: 'Docker', icon: Container, color: 'blue' }
                  ].map((tool, index) => (
                    <div 
                      key={tool.name}
                      className={`group flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        isDarkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      style={{animation: 'fadeInUp 0.8s ease-out', animationDelay: `${index * 0.1}s`}}
                    >
                      <tool.icon 
                        size={32} 
                        className={`mb-2 ${
                          tool.color === 'blue' ? 'text-blue-500' :
                          tool.color === 'green' ? 'text-green-500' :
                          'text-orange-500'
                        }`} 
                      />
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;





