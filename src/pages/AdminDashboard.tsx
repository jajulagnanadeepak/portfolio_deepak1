import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  ArrowLeft,
  Code,
  Award,
  Save,
  X
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  url: string;
  issueDate?: string; // ISO date string
  imageUrl?: string;
  createdAt?: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'certifications'>('projects');
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  // Get data from localStorage or use defaults
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('adminProjects');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default projects
    return [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
        liveUrl: '/demo/ecommerce',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
        liveUrl: '/demo/taskmanager',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: '3',
        title: 'Weather Analytics Dashboard',
        description: 'A data visualization dashboard that displays weather patterns and analytics using third-party APIs and interactive charts.',
        technologies: ['Vue.js', 'Chart.js', 'Weather API', 'Tailwind CSS'],
        liveUrl: '/demo/weather',
        githubUrl: 'https://github.com/jajulagnanadeepak',
        imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ];
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const saved = localStorage.getItem('adminCertifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Add imageUrl if missing for existing certifications
      const imageMap: { [key: string]: string } = {
        'AWS Certified Developer Associate': '/aws.png',
        'Google Cloud Professional Developer': '/orl.png',
        'MongoDB Certified Developer': '/db.png',
        'AWS Certified practitioner': '/orl.png',
        'Oracle Cloud Associate': '/ava.png'
      };
      return parsed.map((cert: Certification) => ({
        ...cert,
        imageUrl: cert.imageUrl || imageMap[cert.name] || ''
      }));
    }
    // Default certifications
    const now = new Date().toISOString();
    return [
      { id: '1', name: 'AWS Certified Developer Associate', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-badge-id/public_url', issueDate: now.substring(0,10), imageUrl: '/aws.png', createdAt: now, updatedAt: now },
      { id: '2', name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', url: 'https://www.credly.com/badges/your-gcp-badge-id/public_url', issueDate: now.substring(0,10), imageUrl: '/orl.png', createdAt: now, updatedAt: now },
      { id: '3', name: 'MongoDB Certified Developer', issuer: 'MongoDB', url: 'https://www.credly.com/badges/your-mongodb-badge-id/public_url', issueDate: now.substring(0,10), imageUrl: '/db.png', createdAt: now, updatedAt: now },
      { id: '4', name: 'AWS Certified practitioner', issuer: 'Amazon Web Services', url: 'https://www.credly.com/badges/your-aws-practitioner-badge-id/public_url', issueDate: now.substring(0,10), imageUrl: '/orl.png', createdAt: now, updatedAt: now },
      { id: '5', name: 'Oracle Cloud Associate', issuer: 'Oracle', url: 'https://www.credly.com/badges/your-oracle-badge-id/public_url', issueDate: now.substring(0,10), imageUrl: '/ava.png', createdAt: now, updatedAt: now }
    ];
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminProjects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('adminCertifications', JSON.stringify(certifications));
  }, [certifications]);

  // Check authentication via token (route guard also protects)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects([...projects, newProject]);
    setShowAddProject(false);
  };

  const updateProject = (updatedProject: Project | Omit<Project, 'id'>) => {
    if ('id' in updatedProject) {
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const addCertification = (certification: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const issueDateIso = certification.issueDate && certification.issueDate.length > 10 ? certification.issueDate : (certification.issueDate ? new Date(certification.issueDate).toISOString() : now);
    const newCertification: Certification = { 
      ...certification, 
      issueDate: issueDateIso, 
      id: Date.now().toString(), 
      createdAt: now, 
      updatedAt: now 
    };
    setCertifications([...certifications, newCertification]);
    setShowAddCertification(false);
  };

  const updateCertification = (updatedCertification: Certification | Omit<Certification, 'id'>) => {
    if ('id' in updatedCertification) {
      const now = new Date().toISOString();
      const adjusted: Certification = {
        ...certifications.find(c => c.id === updatedCertification.id)!,
        ...updatedCertification,
        updatedAt: now,
        issueDate: (updatedCertification as Certification).issueDate
          ? ((updatedCertification as Certification).issueDate!.length > 10 ? (updatedCertification as Certification).issueDate : new Date((updatedCertification as Certification).issueDate!).toISOString())
          : certifications.find(c => c.id === updatedCertification.id)!.issueDate
      };
      setCertifications(certifications.map(c => c.id === adjusted.id ? adjusted : c));
    }
    setEditingCertification(null);
  };

  const deleteCertification = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      setCertifications(certifications.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, Deepak #{localStorage.getItem('adminUsername') || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Code size={20} />
              Projects ({projects.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'certifications'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award size={20} />
              Certifications ({certifications.length})
            </div>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
              <button
                onClick={() => setShowAddProject(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="flex-1 bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Certifications</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddCertification(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Certification
                </button>
                <button
                  onClick={() => {
                    const example: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'> = {
                      name: 'Certified Postman Tester',
                      issuer: 'Test University',
                      url: 'https://www.test-cert.com/123456789',
                      issueDate: '2024-06-01T00:00:00.000+00:00',
                      imageUrl: 'https://example.com/badge.png'
                    };
                    addCertification(example);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  title="Insert example certification"
                >
                  Quick Add Example
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <div key={certification.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {certification.imageUrl ? (
                      <img src={certification.imageUrl} alt={certification.name} className="w-12 h-12 rounded-full object-cover border" />
                    ) : (
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award size={24} className="text-yellow-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{certification.name}</h3>
                      <p className="text-sm text-blue-600">{certification.issuer}</p>
                      {certification.issueDate && (
                        <p className="text-xs text-gray-500">Issued: {new Date(certification.issueDate).toLocaleDateString()}</p>
                      )}
                      <a href={certification.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View Credential</a>
                      {(certification.createdAt || certification.updatedAt) && (
                        <div className="mt-1 text-[11px] text-gray-400">
                          {certification.createdAt && <span>Created: {new Date(certification.createdAt).toLocaleString()}</span>}
                          {certification.updatedAt && <span className="ml-2">Updated: {new Date(certification.updatedAt).toLocaleString()}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCertification(certification)}
                      className="flex-1 bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCertification(certification.id)}
                      className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                  <details className="mt-4">
                    <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">JSON</summary>
                    <pre className="mt-2 p-3 bg-gray-50 border rounded text-xs overflow-x-auto">
{JSON.stringify({
  name: certification.name,
  issuer: certification.issuer,
  url: certification.url,
  issueDate: certification.issueDate,
  imageUrl: certification.imageUrl,
  createdAt: certification.createdAt,
  updatedAt: certification.updatedAt,
  __v: 0
}, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Project Modal */}
      {(showAddProject || editingProject) && (
        <ProjectModal
          project={editingProject}
          onSave={editingProject ? updateProject : addProject}
          onClose={() => {
            setShowAddProject(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Add/Edit Certification Modal */}
      {(showAddCertification || editingCertification) && (
        <CertificationModal
          certification={editingCertification}
          onSave={editingCertification ? updateCertification : addCertification}
          onClose={() => {
            setShowAddCertification(false);
            setEditingCertification(null);
          }}
        />
      )}
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ 
  project, 
  onSave, 
  onClose 
}: { 
  project: Project | null; 
  onSave: (project: Omit<Project, 'id'> | Project) => void; 
  onClose: () => void; 
}) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies.join(', ') || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    imageUrl: project?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    if (project) {
      // Editing existing project - include the id
      onSave({ ...projectData, id: project.id });
    } else {
      // Adding new project - no id needed
      onSave(projectData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {project ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Certification Modal Component
const CertificationModal = ({ 
  certification, 
  onSave, 
  onClose 
}: { 
  certification: Certification | null; 
  onSave: (certification: Omit<Certification, 'id'> | Certification) => void; 
  onClose: () => void; 
}) => {
  const [formData, setFormData] = useState({
    name: certification?.name || '',
    issuer: certification?.issuer || '',
    url: certification?.url || '',
    issueDate: certification?.issueDate ? certification.issueDate.substring(0, 10) : '',
    imageUrl: certification?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (certification) {
      // Editing existing certification - include the id
      onSave({ ...formData, id: certification.id });
    } else {
      // Adding new certification - no id needed
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {certification ? 'Edit Certification' : 'Add New Certification'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issuer</label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/badge.png"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {certification ? 'Update' : 'Add'} Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
