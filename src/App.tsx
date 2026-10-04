import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import {
  Menu,
  X,
  Code,
  ExternalLink,
  Github,
  Mail,
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
  Cloud,
  GitBranch,
  Boxes,
  Globe,
  Zap,
  FileText,
  Layers,
  Workflow,
  Container,
  Terminal,
  Database,
  BrainCircuit,
  BarChart3,
  Server,
  Bot,
  GitMerge,
} from "lucide-react";

import { projects as projectData } from "./data/projects";
import { certifications as certificationData } from "./data/certifications";


// ============================================================
// TYPES
// ============================================================

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  url: string;
  imageUrl?: string;
}

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
}


// ============================================================
// MONGODB ICON
// ============================================================

const MongoDBIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => (
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
      d="M12 2c.2 5.2.2 10.4.2 15.6"
      stroke="#3FA037"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    <path
      d="M12.2 17.6c-.1 1.3-.2 2.7-.2 4.1"
      stroke="#4DB33D"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);


// ============================================================
// CONTACT FORM - EMAILJS ONLY
// ============================================================

const ContactForm: React.FC<{
  isDarkMode: boolean;
}> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        {
          publicKey,
        }
      );

      setSubmitStatus("success");

      setStatusMessage(
        "Message sent successfully! I'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS contact form error:", error);

      setSubmitStatus("error");

      setStatusMessage(
        "Unable to send your message right now. Please try again or email me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================= STATUS ================= */}
      {submitStatus !== "idle" && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 ${submitStatus === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
            }`}
        >
          {submitStatus === "success" ? (
            <CheckCircle
              size={20}
              className="text-green-600 flex-shrink-0"
            />
          ) : (
            <AlertCircle
              size={20}
              className="text-red-600 flex-shrink-0"
            />
          )}

          <span className="text-sm font-medium">
            {statusMessage}
          </span>
        </div>
      )}

      {/* ================= NAME + EMAIL ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name - LEFT */}
        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-semibold mb-2 ${isDarkMode
              ? "text-gray-200"
              : "text-slate-900"
              }`}
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className={`w-full h-14 px-4 rounded-xl border
              outline-none transition-all
              focus:ring-4 focus:ring-blue-500/10
              ${isDarkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
              }`}
          />
        </div>

        {/* Email - RIGHT */}
        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-semibold mb-2 ${isDarkMode
              ? "text-gray-200"
              : "text-slate-900"
              }`}
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className={`w-full h-14 px-4 rounded-xl border
              outline-none transition-all
              focus:ring-4 focus:ring-blue-500/10
              ${isDarkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
              }`}
          />
        </div>
      </div>

      {/* ================= SUBJECT ================= */}
      <div>
        <label
          htmlFor="subject"
          className={`block text-sm font-semibold mb-2 ${isDarkMode
            ? "text-gray-200"
            : "text-slate-900"
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
          placeholder="Project Inquiry"
          className={`w-full h-14 px-4 rounded-xl border
            outline-none transition-all
            focus:ring-4 focus:ring-blue-500/10
            ${isDarkMode
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
            }`}
        />
      </div>

      {/* ================= PROJECT DETAILS ================= */}
      <div>
        <label
          htmlFor="message"
          className={`block text-sm font-semibold mb-2 ${isDarkMode
            ? "text-gray-200"
            : "text-slate-900"
            }`}
        >
          Project Details
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell me about your project goals, timeline, and requirements..."
          className={`w-full px-4 py-4 rounded-xl border
            outline-none resize-none transition-all
            focus:ring-4 focus:ring-blue-500/10
            ${isDarkMode
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
            }`}
        />
      </div>

      {/* ================= SEND BUTTON ================= */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full h-14 px-8 rounded-xl
          font-semibold text-lg
          flex items-center justify-center gap-3
          transition-all duration-300
          ${isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-[1.01]"
          }`}
      >
        {isSubmitting ? (
          <>
            <div
              className="animate-spin rounded-full h-6 w-6
                         border-2 border-white/30 border-t-white"
            />
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


// ============================================================
// APP
// ============================================================

function App() {

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [showScrollTop, setShowScrollTop] =
    useState(false);

  const [isDarkMode, setIsDarkMode] =
    useState(false);

  const [selectedSkillCategory, setSelectedSkillCategory] =
    useState<string | null>(null);


  // ----------------------------------------------------------
  // Scroll detection
  // ----------------------------------------------------------

  useEffect(() => {

    const handleScroll = () => {

      setShowScrollTop(
        window.scrollY > 400
      );


      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "education",
        "contact",
      ];

      const scrollPosition =
        window.scrollY + 120;


      for (const section of sections) {

        const element =
          document.getElementById(section);

        if (!element) continue;


        const offsetTop =
          element.offsetTop;

        const height =
          element.offsetHeight;


        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          setActiveSection(section);
          break;
        }
      }
    };


    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);


  // ----------------------------------------------------------
  // Navigation
  // ----------------------------------------------------------

  const scrollToSection = (
    sectionId: string
  ) => {

    const element =
      document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsMenuOpen(false);
  };


  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  const toggleDarkMode = () => {

    setIsDarkMode(
      (previous) => !previous
    );

  };


  // ----------------------------------------------------------
  // Skills
  // ----------------------------------------------------------

  const skills: Skill[] = [

    // Programming
    {
      name: "Python",
      icon: Code,
      category: "Programming",
    },
    {
      name: "JavaScript",
      icon: FileText,
      category: "Programming",
    },
    {
      name: "TypeScript",
      icon: Code,
      category: "Programming",
    },
    {
      name: "SQL",
      icon: Database,
      category: "Programming",
    },
    {
      name: "Java",
      icon: Code,
      category: "Programming",
    },


    // AI / GenAI
    {
      name: "Generative AI",
      icon: BrainCircuit,
      category: "AI / GenAI",
    },
    {
      name: "LLMs",
      icon: Bot,
      category: "AI / GenAI",
    },
    {
      name: "Prompt Engineering",
      icon: Terminal,
      category: "AI / GenAI",
    },
    {
      name: "RAG",
      icon: Layers,
      category: "AI / GenAI",
    },
    {
      name: "Embeddings",
      icon: Database,
      category: "AI / GenAI",
    },
    {
      name: "Semantic Search",
      icon: Globe,
      category: "AI / GenAI",
    },
    {
      name: "FAISS",
      icon: Layers,
      category: "AI / GenAI",
    },
    {
      name: "Google Gemini",
      icon: Bot,
      category: "AI / GenAI",
    },


    // Data Engineering
    {
      name: "Pandas",
      icon: BarChart3,
      category: "Data Engineering",
    },
    {
      name: "NumPy",
      icon: Database,
      category: "Data Engineering",
    },
    {
      name: "Data Engineering",
      icon: Workflow,
      category: "Data Engineering",
    },
    {
      name: "Data Analytics",
      icon: BarChart3,
      category: "Data Engineering",
    },
    {
      name: "Data Pipelines",
      icon: GitMerge,
      category: "Data Engineering",
    },
    {
      name: "Power BI",
      icon: BarChart3,
      category: "Data Engineering",
    },
    {
      name: "DAX",
      icon: Database,
      category: "Data Engineering",
    },


    // Cloud / DevOps
    {
      name: "AWS",
      icon: Cloud,
      category: "Cloud & DevOps",
    },
    {
      name: "Docker",
      icon: Container,
      category: "Cloud & DevOps",
    },
    {
      name: "Kubernetes",
      icon: Boxes,
      category: "Cloud & DevOps",
    },
    {
      name: "CI/CD",
      icon: Workflow,
      category: "Cloud & DevOps",
    },
    {
      name: "Git",
      icon: GitBranch,
      category: "Cloud & DevOps",
    },
    {
      name: "GitHub",
      icon: Github,
      category: "Cloud & DevOps",
    },
    {
      name: "Linux",
      icon: Terminal,
      category: "Cloud & DevOps",
    },
    {
      name: "Cloud Computing",
      icon: Cloud,
      category: "Cloud & DevOps",
    },


    // Development
    {
      name: "React.js",
      icon: Layers,
      category: "Development",
    },
    {
      name: "Node.js",
      icon: Terminal,
      category: "Development",
    },
    {
      name: "Express.js",
      icon: Server,
      category: "Development",
    },
    {
      name: "FastAPI",
      icon: Zap,
      category: "Development",
    },
    {
      name: "Spring Boot",
      icon: Server,
      category: "Development",
    },
    {
      name: "REST APIs",
      icon: Globe,
      category: "Development",
    },
    {
      name: "MongoDB",
      icon: MongoDBIcon,
      category: "Development",
    },
    {
      name: "MongoDB Atlas",
      icon: MongoDBIcon,
      category: "Development",
    },
  ];


  // ----------------------------------------------------------
  // Education
  // ----------------------------------------------------------

  const education = [
    {
      degree: "B.Tech, Computer Science and Engineering",
      institution: "KL University, Vaddeswaram",
      year: "Aug 2023 – May 2027",
      description:
        "Pursuing a Bachelor of Technology in Computer Science and Engineering, with a focus on software development, cloud computing, DevOps, AI/ML, data engineering, and cloud-native technologies.",
      image: "/KL-University.webp",
    },
    {
      degree: "Intermediate, MPC",
      institution: "Narayana Junior College - India",
      year: "Jun 2021 – Mar 2023",
      description:
        "Completed Intermediate education with a focus on Mathematics, Physics, and Chemistry, building a strong foundation in analytical thinking, problem-solving, and quantitative skills.",
      image: "",
    },
    {
      degree: "Secondary School, General Studies",
      institution:
        "Bharatiya Vidya Bhavan's Residential Public School",
      year: "Jun 2018 – May 2021",
      description:
        "Completed secondary school education at Bharatiya Vidya Bhavan's Residential Public School, developing a strong foundation in mathematics, science, communication, and analytical thinking.",
      image: "",
    },
    {
      degree: "Middle School, General Studies",
      institution: "International Indian School, Jubail (IISJ)",
      year: "Jul 2013 – Apr 2018",
      description:
        "Completed schooling at International Indian School, Jubail, Saudi Arabia.",
      image: "",
    },
  ];

  // ----------------------------------------------------------
  // Static Projects
  // ----------------------------------------------------------

  const projects: Project[] =
    projectData as Project[];


  // ----------------------------------------------------------
  // Static Certifications
  // ----------------------------------------------------------

  const certifications: Certification[] =
    certificationData as Certification[];


  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-50 text-gray-900"
        }`}
    >


      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav
        className={`fixed top-0 w-full backdrop-blur-md z-50 shadow-lg ${isDarkMode
          ? "bg-gray-800"
          : "bg-slate-900"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <button
              onClick={() =>
                scrollToSection("home")
              }
              className="flex items-center gap-3"
            >

              <img
                src="/logopf.webp"
                alt="J G Deepak Logo"
                className="w-10 h-10 object-contain"
              />

              <div className="leading-tight text-left">

                <div className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                  J G Deepak
                </div>

                <div className="text-xs text-gray-300 uppercase tracking-wider">
                  Portfolio
                </div>

              </div>

            </button>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">

              {[
                {
                  id: "home",
                  label: "Home",
                },
                {
                  id: "about",
                  label: "About",
                },
                {
                  id: "skills",
                  label: "Skills",
                },
                {
                  id: "projects",
                  label: "Projects",
                },
                {
                  id: "experience",
                  label: "Experience",
                },
                {
                  id: "education",
                  label: "Education",
                },
                {
                  id: "contact",
                  label: "Contact",
                },
              ].map((item) => (

                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === item.id
                    ? "text-blue-400 bg-slate-800"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                    }`}
                >
                  {item.label}
                </button>

              ))}


              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={19} />
                ) : (
                  <Moon size={19} />
                )}
              </button>

            </div>


            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-300 hover:bg-slate-800"
              >
                {isDarkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              <button
                onClick={() =>
                  setIsMenuOpen(
                    (previous) => !previous
                  )
                }
                className="p-2 text-gray-300"
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>

            </div>

          </div>


          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">

              {[
                {
                  id: "home",
                  label: "Home",
                },
                {
                  id: "about",
                  label: "About",
                },
                {
                  id: "skills",
                  label: "Skills",
                },
                {
                  id: "projects",
                  label: "Projects",
                },
                {
                  id: "experience",
                  label: "Experience",
                },
                {
                  id: "education",
                  label: "Education",
                },
                {
                  id: "contact",
                  label: "Contact",
                },
              ].map((item) => (

                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg"
                >
                  {item.label}
                </button>

              ))}

            </div>
          )}

        </div>
      </nav>


      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className={`min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden ${isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          }`}
      >

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Text */}
            <div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isDarkMode
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                  }`}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for opportunities
              </div>


              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-5 ${isDarkMode
                  ? "text-white"
                  : "text-gray-900"
                  }`}
              >
                J G Deepak
              </h1>


              <h2
                className={`text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed mb-6 ${isDarkMode
                  ? "text-gray-200"
                  : "text-gray-800"
                  }`}
              >
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AI Engineer Trainee @ Calibo
                </span>

                <span className="mx-2 text-gray-400">
                  |
                </span>

                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AI & Data Engineering
                </span>

                <span className="mx-2 text-gray-400">
                  |
                </span>

                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Cloud-Native & DevOps
                </span>
              </h2>


              <p
                className={`text-base md:text-lg leading-relaxed max-w-3xl mb-8 ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-600"
                  }`}
              >
                I build AI-powered, data-driven, and cloud-native
                solutions using Python, LLMs, data engineering,
                full-stack development, and DevOps practices.
                Currently working as an AI Engineer Trainee at
                Calibo, with hands-on experience across AI,
                analytics, cloud technologies, automation, and
                modern software engineering.
              </p>


              {/* Buttons */}
              <div className="flex flex-wrap gap-4">

                <a
                  href="/2300030263_Deepak.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Download size={19} />
                  Download Resume
                </a>


                <button
                  onClick={() =>
                    scrollToSection("contact")
                  }
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold transition-all hover:scale-105 ${isDarkMode
                    ? "border-gray-600 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-800 hover:bg-white"
                    }`}
                >
                  <Mail size={19} />
                  Get In Touch
                </button>

              </div>

            </div>


            {/* Profile */}
            <div className="flex justify-center lg:justify-end">

              <div className="relative group">

                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />


                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">

                  <div className="w-[88%] h-[88%] bg-white rounded-full overflow-hidden shadow-inner">

                    <img
                      src="/photo.webp"
                      alt="J G Deepak"
                      className="w-full h-full object-cover"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ABOUT
      ====================================================== */}

      <section
        id="about"
        className={`py-20 ${isDarkMode
          ? "bg-gray-900"
          : "bg-white"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Know Me
              </span>
            </h2>

            <p
              className={`text-lg max-w-3xl mx-auto ${isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
                }`}
            >
              AI Engineer Trainee focused on AI, Data Engineering,
              Cloud-Native development, DevOps, and full-stack
              engineering.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* AI */}
            <div
              className={`rounded-2xl p-7 border shadow-lg hover:-translate-y-2 transition-all ${isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-blue-50 border-blue-100"
                }`}
            >

              <div className="flex items-center gap-3 mb-5">

                <div className="p-3 rounded-xl bg-blue-100">
                  <BrainCircuit
                    className="text-blue-600"
                    size={25}
                  />
                </div>

                <h3 className="text-xl font-bold">
                  AI & Generative AI
                </h3>

              </div>

              <p
                className={`leading-relaxed ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >
                Working with Python, LLMs, Prompt Engineering,
                RAG, embeddings, semantic search, and AI-powered
                application workflows.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "Python",
                  "LLMs",
                  "RAG",
                  "Prompt Engineering",
                  "Generative AI",
                ].map((item) => (

                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-700"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>


            {/* Data */}
            <div
              className={`rounded-2xl p-7 border shadow-lg hover:-translate-y-2 transition-all ${isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-purple-50 border-purple-100"
                }`}
            >

              <div className="flex items-center gap-3 mb-5">

                <div className="p-3 rounded-xl bg-purple-100">
                  <BarChart3
                    className="text-purple-600"
                    size={25}
                  />
                </div>

                <h3 className="text-xl font-bold">
                  Data Engineering & Analytics
                </h3>

              </div>

              <p
                className={`leading-relaxed ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >
                Building data workflows and analytics solutions
                using Python, SQL, Pandas, NumPy, Power BI, and
                data engineering concepts.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "Python",
                  "SQL",
                  "Pandas",
                  "NumPy",
                  "Power BI",
                  "Data Engineering",
                ].map((item) => (

                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-200 text-purple-700"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>


            {/* Cloud */}
            <div
              className={`rounded-2xl p-7 border shadow-lg hover:-translate-y-2 transition-all ${isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-green-100"
                }`}
            >

              <div className="flex items-center gap-3 mb-5">

                <div className="p-3 rounded-xl bg-green-100">
                  <Cloud
                    className="text-green-600"
                    size={25}
                  />
                </div>

                <h3 className="text-xl font-bold">
                  Cloud-Native & DevOps
                </h3>

              </div>

              <p
                className={`leading-relaxed ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >
                Developing and deploying scalable applications
                using cloud, containers, Kubernetes, CI/CD, and
                automation.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "CI/CD",
                  "Cloud",
                  "DevOps",
                ].map((item) => (

                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-700"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          SKILLS
      ====================================================== */}

      <section
        id="skills"
        className={`py-20 ${isDarkMode
          ? "bg-gray-800"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold">

              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Technical Skills
              </span>

            </h2>

          </div>


          {/* Skill Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                name: "Programming",
                icon: Code,
                description: "Core programming languages and SQL",
              },
              {
                name: "AI / GenAI",
                icon: BrainCircuit,
                description: "LLMs, RAG, embeddings and AI workflows",
              },
              {
                name: "Data Engineering",
                icon: BarChart3,
                description: "Data processing, analytics and BI",
              },
              {
                name: "Cloud & Development",
                icon: Cloud,
                description: "Cloud, DevOps, backend and frontend",
              },
            ].map((category) => {
              const Icon = category.icon;
              const isSelected = selectedSkillCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    setSelectedSkillCategory(
                      isSelected ? null : category.name
                    )
                  }
                  className={`text-left rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isSelected
                    ? isDarkMode
                      ? "bg-blue-900/40 border-blue-500 shadow-lg"
                      : "bg-blue-50 border-blue-400 shadow-lg"
                    : isDarkMode
                      ? "bg-gray-900 border-gray-700 hover:border-blue-500"
                      : "bg-white border-gray-200 hover:border-blue-400"
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
                          }`}
                      >
                        <Icon
                          size={23}
                          className="text-blue-500"
                        />
                      </div>

                      <div>
                        <h3
                          className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                          {category.name}
                        </h3>
                        <p
                          className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xl transition-transform duration-300 ${isSelected ? "rotate-45" : ""
                        } ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                    >
                      +
                    </span>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Related Skills */}
          {selectedSkillCategory && (
            <div
              className={`mt-6 rounded-2xl border p-6 transition-all duration-300 ${isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200 shadow-md"
                }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold">
                  {selectedSkillCategory} Skills
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedSkillCategory(null)}
                  className={`text-sm font-medium ${isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  Close
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((skill) =>
                    selectedSkillCategory === "Cloud & Development"
                      ? skill.category === "Cloud & DevOps" ||
                      skill.category === "Development"
                      : skill.category === selectedSkillCategory
                  )
                  .map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${isDarkMode
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-gray-50 border-gray-200 text-gray-800"
                          }`}
                      >
                        {skill.name === "MongoDB" ||
                          skill.name === "MongoDB Atlas" ? (
                          <MongoDBIcon
                            size={18}
                            className="text-green-500"
                          />
                        ) : (
                          <Icon
                            size={18}
                            className="text-blue-500"
                          />
                        )}
                        {skill.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

        </div>

      </section>


      {/* ======================================================
          EXPERIENCE
      ====================================================== */}

      <section
        id="experience"
        className={`py-20 ${isDarkMode
          ? "bg-gray-900"
          : "bg-white"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold">

              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Experience
              </span>

            </h2>

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


            {/* AI Engineer */}
            <div
              className={`rounded-3xl p-8 border shadow-lg hover:-translate-y-2 transition-all ${isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-blue-50 border-blue-100"
                }`}
            >

              <div className="flex items-center gap-4 mb-6">

                <div className="p-3 rounded-xl bg-blue-100">
                  <BrainCircuit
                    className="text-blue-600"
                    size={26}
                  />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    AI Engineer Trainee
                  </h3>

                  <p className="text-blue-500 font-semibold text-sm">
                    Calibo • Current
                  </p>

                </div>

              </div>


              <p
                className={`leading-relaxed mb-6 ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >
                Working across AI, Data Engineering, analytics,
                and cloud-native technology while developing
                practical solutions using Python, LLMs, data
                processing, SQL, and modern engineering practices.
              </p>


              <div className="flex flex-wrap gap-2 mb-6">

                {[
                  "AI",
                  "Python",
                  "LLMs",
                  "Data Engineering",
                  "SQL",
                  "Analytics",
                  "Cloud",
                  "DevOps",
                ].map((item) => (

                  <span
                    key={item}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {item}
                  </span>

                ))}

              </div>


              <ul
                className={`space-y-3 ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >

                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-blue-500 mt-1 flex-shrink-0"
                  />

                  <span className="text-sm">
                    Working with AI and Generative AI concepts
                    including LLMs, prompt engineering, embeddings,
                    and RAG.
                  </span>

                </li>


                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-purple-500 mt-1 flex-shrink-0"
                  />

                  <span className="text-sm">
                    Developing data processing and analytics
                    workflows using Python, Pandas, NumPy,
                    SQL, and visualization tools.
                  </span>

                </li>


                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-pink-500 mt-1 flex-shrink-0"
                  />

                  <span className="text-sm">
                    Building cloud-native and DevOps-oriented
                    solutions using Docker, Kubernetes, CI/CD,
                    and cloud platforms.
                  </span>

                </li>


                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />

                  <span className="text-sm">
                    Applying AI and data engineering concepts
                    to practical business and analytics use cases.
                  </span>

                </li>

              </ul>

            </div>


            {/* Projects */}
            <div
              className={`rounded-3xl p-8 border shadow-lg hover:-translate-y-2 transition-all ${isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-purple-50 border-purple-100"
                }`}
            >

              <div className="flex items-center gap-4 mb-6">

                <div className="p-3 rounded-xl bg-purple-100">
                  <Cloud
                    className="text-purple-600"
                    size={26}
                  />
                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Full Stack & Cloud Projects
                  </h3>

                  <p className="text-purple-500 font-semibold text-sm">
                    Personal & Academic Projects
                  </p>

                </div>

              </div>


              <p
                className={`leading-relaxed mb-6 ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >
                Building full-stack applications and cloud-native
                projects using modern frontend, backend, database,
                containerization, and deployment technologies.
              </p>


              <div className="flex flex-wrap gap-2 mb-6">

                {[
                  "React",
                  "Node.js",
                  "Spring Boot",
                  "MongoDB",
                  "Docker",
                  "Kubernetes",
                  "AWS",
                  "CI/CD",
                ].map((item) => (

                  <span
                    key={item}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode
                      ? "bg-purple-900 text-purple-200"
                      : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {item}
                  </span>

                ))}

              </div>


              <ul
                className={`space-y-3 ${isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
                  }`}
              >

                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-purple-500 mt-1"
                  />

                  <span className="text-sm">
                    Developed full-stack applications using
                    modern frontend and backend technologies.
                  </span>

                </li>


                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-blue-500 mt-1"
                  />

                  <span className="text-sm">
                    Worked with REST APIs, databases,
                    authentication, and application workflows.
                  </span>

                </li>


                <li className="flex items-start gap-2">

                  <Zap
                    size={16}
                    className="text-pink-500 mt-1"
                  />

                  <span className="text-sm">
                    Containerized and deployed applications
                    using Docker, Kubernetes, CI/CD, and
                    cloud technologies.
                  </span>

                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          PROJECTS
      ====================================================== */}

      <section
        id="projects"
        className={`py-20 ${isDarkMode
          ? "bg-gray-800"
          : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold">

              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Featured Projects
              </span>

            </h2>

            <p
              className={`mt-4 max-w-2xl mx-auto ${isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
                }`}
            >
              A selection of AI, data engineering, full-stack,
              analytics, and cloud-native projects.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project, index) => (

              <div
                key={`${project.title}-${index}`}
                className={`group rounded-2xl overflow-hidden border shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all ${isDarkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
                  }`}
              >

                {/* Image */}
                <div className="h-40 overflow-hidden">

                  {project.imageUrl ? (

                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  ) : (

                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">

                      <Code
                        size={42}
                        className="text-white opacity-80"
                      />

                    </div>

                  )}

                </div>


                {/* Content */}
                <div className="p-6">

                  <h3
                    className={`text-xl font-bold mb-3 ${isDarkMode
                      ? "text-white"
                      : "text-gray-900"
                      }`}
                  >
                    {project.title}
                  </h3>


                  <p
                    className={`text-sm leading-relaxed mb-5 ${isDarkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                      }`}
                  >
                    {project.description}
                  </p>


                  <div className="flex flex-wrap gap-2 mb-5">

                    {project.technologies.map(
                      (technology) => (

                        <span
                          key={technology}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${isDarkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {technology}
                        </span>

                      )
                    )}

                  </div>


                  {/* Buttons only when URL exists */}
                  {(project.liveUrl ||
                    project.githubUrl) && (

                      <div className="flex gap-3">

                        {project.liveUrl &&
                          project.liveUrl.trim() !== "" && (

                            project.liveUrl.startsWith(
                              "/demo/"
                            ) ? (

                              <Link
                                to={project.liveUrl}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                              >
                                <ExternalLink
                                  size={15}
                                />
                                Live Demo
                              </Link>

                            ) : (

                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                              >
                                <ExternalLink
                                  size={15}
                                />
                                Live Demo
                              </a>

                            )
                          )}


                        {project.githubUrl &&
                          project.githubUrl.trim() !== "" && (

                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
                            >
                              <Github size={15} />
                              GitHub
                            </a>

                          )}

                      </div>

                    )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          EDUCATION & CERTIFICATIONS
      ====================================================== */}

      <section
        id="education"
        className={`py-20 ${isDarkMode
          ? "bg-gray-900"
          : "bg-white"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold">

              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Education & Certifications
              </span>

            </h2>

          </div>


          {/* Education */}
          <div className="mb-14">

            {/* Education Heading */}
            <div className="flex items-center gap-3 mb-6">
              <BookOpen
                className="text-blue-500"
                size={26}
              />

              <h3 className="text-2xl font-bold">
                Education
              </h3>
            </div>

            {/* 2 × 2 Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {education.map((item) => (

                <div
                  key={item.degree}
                  className={`rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-blue-50 border-blue-100"
                    }`}
                >

                  {/* Logo + Content */}
                  <div className="flex items-start gap-5">

                    {/* Institution Logo */}
                    <div className="flex-shrink-0">

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center">

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={item.institution}
                            className="w-full h-full object-contain p-2"
                          />

                        ) : (

                          <BookOpen
                            className="text-blue-500"
                            size={28}
                          />

                        )}

                      </div>

                    </div>

                    {/* Education Details */}
                    <div className="flex-1 min-w-0">

                      <h4
                        className={`text-lg font-bold mb-2 ${isDarkMode
                          ? "text-white"
                          : "text-slate-900"
                          }`}
                      >
                        {item.degree}
                      </h4>

                      <p className="text-blue-500 font-semibold mb-1">
                        {item.institution}
                      </p>

                      <p
                        className={`text-sm mb-3 ${isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                          }`}
                      >
                        {item.year}
                      </p>

                      <p
                        className={`text-sm leading-relaxed ${isDarkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                          }`}
                      >
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Certifications */}
          <div>

            <div className="flex items-center gap-3 mb-6">

              <Award
                className="text-yellow-500"
                size={26}
              />

              <h3 className="text-2xl font-bold">
                Professional Certifications
              </h3>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {certifications.map((cert) => (

                <div
                  key={cert.id}
                  className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDarkMode
                    ? "bg-gray-800 border-gray-700 hover:border-yellow-500"
                    : "bg-white border-gray-200 hover:border-yellow-400"
                    }`}
                >

                  {/* Logo */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode
                      ? "bg-yellow-900/40"
                      : "bg-yellow-100"
                      }`}
                  >

                    {cert.imageUrl ? (

                      <img
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-8 h-8 object-contain"
                      />

                    ) : (

                      <Award
                        size={23}
                        className="text-yellow-500"
                      />

                    )}

                  </div>


                  {/* Details */}
                  <div className="flex-1 min-w-0">

                    <h4
                      className={`font-semibold text-sm md:text-base ${isDarkMode
                        ? "text-white"
                        : "text-gray-900"
                        }`}
                    >
                      {cert.name}
                    </h4>


                    <p
                      className={`text-sm mt-1 ${isDarkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                        }`}
                    >
                      {cert.issuer}
                    </p>


                    <p
                      className={`text-xs mt-1 ${isDarkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                        }`}
                    >
                      {cert.issued}

                      {cert.expires &&
                        ` · Expires ${cert.expires}`}
                    </p>


                    {cert.credentialId && (

                      <p
                        className={`text-xs mt-1 truncate ${isDarkMode
                          ? "text-gray-500"
                          : "text-gray-500"
                          }`}
                      >
                        Credential ID:{" "}
                        {cert.credentialId}
                      </p>

                    )}

                  </div>


                  {/* Credential button */}
                  {cert.url &&
                    cert.url.trim() !== "" && (

                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-sm font-semibold text-blue-500 hover:text-blue-600"
                      >
                        View Credential →
                      </a>

                    )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          CONTACT
      ====================================================== */}
      {/* ================= CONTACT SECTION ================= */}
      <section
        id="contact"
        className={`py-24 px-6 ${isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
      >
        <div className="max-w-7xl mx-auto">

          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>

            <p
              className={`mt-4 text-lg ${isDarkMode ? "text-gray-400" : "text-slate-600"
                }`}
            >
              Have a project, opportunity, or idea? Let's connect.
            </p>
          </div>

          {/* ================= LEFT + RIGHT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* ================= LEFT SIDE ================= */}
            <div className="lg:col-span-2">

              <h3
                className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-slate-900"
                  }`}
              >
                Let's Connect
              </h3>

              <p
                className={`text-base leading-7 mb-10 ${isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}
              >
                I'm interested in AI engineering, data engineering,
                cloud-native development, DevOps, full-stack development,
                and technology-driven projects.
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p
                    className={`font-semibold ${isDarkMode
                      ? "text-white"
                      : "text-slate-900"
                      }`}
                  >
                    jajulagnadeepak@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 mb-9">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <p
                    className={`font-semibold ${isDarkMode
                      ? "text-white"
                      : "text-slate-900"
                      }`}
                  >
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">

                {/* LinkedIn */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-blue-100
                       flex items-center justify-center
                       text-blue-600
                       hover:bg-blue-200
                       transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* GitHub */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-slate-200
                       flex items-center justify-center
                       text-slate-800
                       hover:bg-slate-300
                       transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>

              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="lg:col-span-3">

              <div
                className={`rounded-3xl border p-8 shadow-xl ${isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-slate-200"
                  }`}
              >

                {/* Form Header */}
                <div className="flex items-center gap-4 mb-8">

                  <div
                    className="w-14 h-14 rounded-xl
                         bg-gradient-to-br from-blue-100 to-purple-100
                         flex items-center justify-center"
                  >
                    <Send className="w-6 h-6 text-purple-600" />
                  </div>

                  <div>
                    <h3
                      className={`text-xl font-bold ${isDarkMode
                        ? "text-white"
                        : "text-slate-900"
                        }`}
                    >
                      Send a Message
                    </h3>

                    <p
                      className={
                        isDarkMode
                          ? "text-gray-400"
                          : "text-slate-600"
                      }
                    >
                      Let's discuss your project
                    </p>
                  </div>

                </div>

                {/* Contact Form */}
                <ContactForm isDarkMode={isDarkMode} />

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer
        className={`py-12 transition-colors duration-300 ${isDarkMode
          ? "bg-gray-800"
          : "bg-slate-900"
          } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div className="md:col-span-2">

              <h3 className="text-2xl font-bold mb-4">
                J G Deepak
              </h3>

              <p
                className={`mb-5 leading-relaxed max-w-xl transition-colors duration-300 ${isDarkMode
                  ? "text-gray-200"
                  : "text-gray-300"
                  }`}
              >
                AI Engineer Trainee @ Calibo | AI & Data Engineering |
                Cloud-Native & DevOps.
                <br />
                Building AI-powered, data-driven, and scalable software
                solutions.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jajula-gnana-deepak-a84a41375"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={23} />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/jajulagnanadeepak"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={23} />
                </a>

                {/* Email */}
                <a
                  href="mailto:jajulagnanadeepak@gmail.com"
                  aria-label="Email"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Mail size={23} />
                </a>

              </div>

            </div>


            {/* Quick Navigation */}
            <div>

              <h4 className="text-lg font-semibold mb-4">
                Quick Navigation
              </h4>

              <ul className="space-y-2">

                {[
                  ["home", "Home"],
                  ["about", "About"],
                  ["skills", "Skills"],
                  ["projects", "Projects"],
                  ["experience", "Experience"],
                  ["education", "Education"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (

                  <li key={id}>

                    <button
                      onClick={() => scrollToSection(id)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {label}
                    </button>

                  </li>

                ))}

              </ul>

            </div>


            {/* Services */}
            <div>

              <h4 className="text-lg font-semibold mb-4">
                Services
              </h4>

              <ul className="space-y-2 text-gray-300">

                <li>AI & Generative AI</li>
                <li>Data Engineering</li>
                <li>Cloud & DevOps</li>
                <li>Full Stack Development</li>
                <li>Data Analytics</li>

              </ul>

            </div>

          </div>


          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-10 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-400 text-sm">
              © 2026 J G Deepak. All rights reserved.
            </p>

            <Link
              to="/admin/login"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Admin
            </Link>

          </div>

        </div>
      </footer>


      {/* ======================================================
          SCROLL TO TOP
      ====================================================== */}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-7 right-7 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} />
        </button>
      )}

    </div>
  );
}

export default App;