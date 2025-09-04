import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Cloud, CloudRain, CloudLightning, Thermometer, Droplets, Wind, Eye } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  hourly: Array<{
    time: string;
    temp: number;
    condition: string;
  }>;
}

const WeatherDemo = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('New York');
  const [weatherData, setWeatherData] = useState<WeatherData>({
    city: 'New York',
    temperature: 72,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    hourly: [
      { time: '9 AM', temp: 68, condition: 'Sunny' },
      { time: '10 AM', temp: 70, condition: 'Sunny' },
      { time: '11 AM', temp: 72, condition: 'Sunny' },
      { time: '12 PM', temp: 75, condition: 'Partly Cloudy' },
      { time: '1 PM', temp: 77, condition: 'Partly Cloudy' },
      { time: '2 PM', temp: 78, condition: 'Cloudy' },
      { time: '3 PM', temp: 76, condition: 'Cloudy' },
      { time: '4 PM', temp: 74, condition: 'Partly Cloudy' },
      { time: '5 PM', temp: 71, condition: 'Sunny' },
      { time: '6 PM', temp: 69, condition: 'Clear' }
    ]
  });

  const cities = [
    { name: 'New York', temp: 72, condition: 'Sunny' },
    { name: 'London', temp: 58, condition: 'Cloudy' },
    { name: 'Tokyo', temp: 75, condition: 'Partly Cloudy' },
    { name: 'Sydney', temp: 82, condition: 'Clear' },
    { name: 'Paris', temp: 65, condition: 'Rainy' }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun size={24} className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-500" />;
      case 'partly cloudy':
        return <Cloud size={24} className="text-blue-400" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-600" />;
      case 'stormy':
        return <CloudLightning size={24} className="text-purple-600" />;
      default:
        return <Sun size={24} className="text-yellow-500" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'bg-yellow-100 text-yellow-800';
      case 'cloudy':
        return 'bg-gray-100 text-gray-800';
      case 'partly cloudy':
        return 'bg-blue-100 text-blue-800';
      case 'rainy':
        return 'bg-blue-100 text-blue-800';
      case 'stormy':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    // Simulate weather data update
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + Math.floor(Math.random() * 3) - 1,
        humidity: Math.max(40, Math.min(90, prev.humidity + Math.floor(Math.random() * 6) - 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <h1 className="text-xl font-bold text-gray-900">Weather Analytics Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Real-time updates</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City Selector */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select City</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCity === city.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">{city.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {getWeatherIcon(city.condition)}
                    <span className="text-2xl font-bold text-gray-900">{city.temp}°</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{city.condition}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{weatherData.city}</h2>
                <p className="text-gray-600">Current Weather</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-gray-900">{weatherData.temperature}°</div>
                <div className="flex items-center gap-2 justify-end">
                  {getWeatherIcon(weatherData.condition)}
                  <span className="text-lg text-gray-700">{weatherData.condition}</span>
                </div>
              </div>
            </div>
            
            {/* Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Thermometer size={24} className="text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-lg font-semibold text-gray-900">{weatherData.humidity}%</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Wind size={24} className="text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-lg font-semibold text-gray-900">{weatherData.windSpeed} mph</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye size={24} className="text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Visibility</p>
                <p className="text-lg font-semibold text-gray-900">{weatherData.visibility} mi</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Droplets size={24} className="text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="text-lg font-semibold text-gray-900">29.92 in</p>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Forecast</h3>
            <div className="space-y-3">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{hour.time}</span>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(hour.condition)}
                    <span className="text-sm text-gray-900">{hour.temp}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Temperature Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend</h3>
            <div className="h-64 bg-gradient-to-t from-red-100 to-blue-100 rounded-lg p-4">
              <div className="flex items-end justify-between h-full">
                {weatherData.hourly.map((hour, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-600 rounded-t transition-all duration-500"
                      style={{ height: `${(hour.temp - 60) * 3}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Conditions</h3>
            <div className="space-y-4">
              {['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Clear'].map((condition) => (
                <div key={condition} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(condition)}
                    <span className="text-gray-700">{condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConditionColor(condition).split(' ')[0]}`}
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {Math.floor(Math.random() * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-800">High UV Index Warning - Limit sun exposure between 10 AM - 4 PM</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800">Air Quality Alert - Moderate levels expected today</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800">Pollen Count - Low levels, good for outdoor activities</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherDemo;

