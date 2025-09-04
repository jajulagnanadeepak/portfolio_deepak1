import React from 'react';
import { useLocation } from 'react-router-dom';
import EcommerceDemo from './EcommerceDemo';
import TaskManagerDemo from './TaskManagerDemo';
import WeatherDemo from './WeatherDemo';

const DemoRouter = () => {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case '/demo/ecommerce':
      return <EcommerceDemo />;
    case '/demo/taskmanager':
      return <TaskManagerDemo />;
    case '/demo/weather':
      return <WeatherDemo />;
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Demo Not Found</h1>
            <p className="text-gray-600 mb-6">The requested demo could not be found.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
  }
};

export default DemoRouter;

