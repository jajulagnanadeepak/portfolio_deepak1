import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Calendar, 
  User, 
  Bell, 
  Settings,
  TrendingUp,
  Clock,
  Shield,
  Thermometer,
  Zap,
  Moon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const healthMetrics = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Heart Rate",
      value: "78",
      unit: "BPM",
      status: "Normal",
      color: "text-red-500",
      bgColor: "bg-red-50",
      trend: "+2%"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "Optimal",
      color: "text-green-500",
      bgColor: "bg-green-50",
      trend: "-1%"
    },
    {
      icon: <Thermometer className="h-8 w-8" />,
      title: "Body Temperature",
      value: "98.6",
      unit: "°F",
      status: "Normal",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      trend: "0%"
    },
    {
      icon: <Moon className="h-8 w-8" />,
      title: "Sleep Quality",
      value: "87",
      unit: "%",
      status: "Good",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      trend: "+5%"
    }
  ];

  const upcomingAppointments = [
    {
      doctor: "Dr. Emily Johnson",
      specialty: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Follow-up"
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "General Practitioner",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Check-up"
    },
    {
      doctor: "Dr. Sarah Williams",
      specialty: "Dermatologist",
      date: "Dec 28",
      time: "3:15 PM",
      type: "Consultation"
    }
  ];

  const recentActivity = [
    {
      action: "Blood pressure recorded",
      time: "2 hours ago",
      icon: <Activity className="h-4 w-4" />
    },
    {
      action: "Medication reminder completed",
      time: "4 hours ago",
      icon: <Zap className="h-4 w-4" />
    },
    {
      action: "Sleep data synced",
      time: "8 hours ago",
      icon: <Moon className="h-4 w-4" />
    },
    {
      action: "Heart rate monitored",
      time: "12 hours ago",
      icon: <Heart className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HealthCare+</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">Patient ID: #12345</p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Here's your health overview for today, December 26, 2025
          </p>
        </motion.div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.bgColor} ${metric.color} p-3 rounded-xl`}>
                  {metric.icon}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {metric.trend}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{metric.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <p className={`text-sm font-medium ${metric.color}`}>{metric.status}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h3>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div 
                  key={index}
                  className="bg-white/50 rounded-xl p-4 flex items-center justify-between hover:bg-white/70 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 glass-effect rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white/50 hover:bg-white/70 rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-800">Book Appointment</p>
            </button>
            <button className="bg-white/50 hover:bg-white/70 rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-800">Log Vital Signs</p>
            </button>
            <button className="bg-white/50 hover:bg-white/70 rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-800">View Reports</p>
            </button>
            <button className="bg-white/50 hover:bg-white/70 rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105">
              <div className="bg-teal-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-sm font-medium text-gray-800">Medications</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;