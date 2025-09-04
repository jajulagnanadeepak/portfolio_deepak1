import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Users, 
  Calendar, 
  Activity, 
  Stethoscope,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Personalized Care",
      description: "AI-powered health insights tailored to your unique needs and medical history."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Bank-level security with end-to-end encryption to protect your health data."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Network",
      description: "Connect with certified healthcare professionals and specialists worldwide."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Intelligent appointment booking that fits your lifestyle and preferences."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients" },
    { number: "200+", label: "Expert Doctors" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Health,{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Our Priority
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the future of healthcare with our comprehensive digital platform. 
                  Monitor, manage, and improve your health with expert guidance and cutting-edge technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                  Sign In
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-effect rounded-3xl p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Health Monitoring</div>
                    <div className="text-sm text-gray-600">Real-time vital tracking</div>
                  </div>
                  <div className="text-green-500 ml-auto">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <span className="text-green-600 font-bold">72 BPM</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sleep Quality</span>
                    <span className="text-blue-600 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-teal-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose HealthCare+?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced technology with personalized care to deliver 
              the best possible health outcomes for you and your family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-3 rounded-xl w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 space-y-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-fit mx-auto">
              <Stethoscope className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                Ready to Transform Your Health Journey?
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of users who have already taken control of their health with our platform.
              </p>
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">HealthCare+</span>
          </div>
          <p className="text-gray-400">
            © 2025 HealthCare+. All rights reserved. Your health, our commitment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;