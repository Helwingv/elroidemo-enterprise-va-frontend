import { useState } from 'react';
import { 
  AlertTriangle, Bell, CheckCircle, Clock, MapPin, 
  TrendingUp, Brain, Calendar, Filter, Search,
  ChevronRight, AlertOctagon, Shield, Activity
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'success' | 'monitoring';
  title: string;
  message: string;
  time: string;
  location?: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Data Integrity Issue',
    message: 'Inconsistent data detected in patient records synchronization',
    time: '10 minutes ago',
    location: 'Database Server 02',
    status: 'Unresolved',
    priority: 'high',
    category: 'System'
  },
  {
    id: '2',
    type: 'critical',
    title: 'Failed Data Transfer',
    message: 'Healthcare provider integration endpoint not responding',
    time: '15 minutes ago',
    location: 'API Gateway',
    status: 'In Progress',
    priority: 'high',
    category: 'Integration'
  },
  {
    id: '3',
    type: 'success',
    title: 'Consent Agreement Updated',
    message: 'New data sharing agreement successfully processed',
    time: '1 hour ago',
    status: 'Completed',
    priority: 'medium',
    category: 'Compliance'
  },
  {
    id: '4',
    type: 'success',
    title: 'Records Verification',
    message: 'Monthly health records audit completed successfully',
    time: '2 hours ago',
    status: 'Verified',
    priority: 'medium',
    category: 'Audit'
  },
  {
    id: '5',
    type: 'monitoring',
    title: 'PTSD Assessment Trend',
    message: 'Increased PTSD reports in Western Region',
    time: '3 hours ago',
    location: 'Western Region',
    status: 'Monitoring',
    priority: 'medium',
    category: 'Health Trends'
  },
  {
    id: '6',
    type: 'monitoring',
    title: 'Mental Health Services',
    message: 'Usage spike in telehealth mental health services',
    time: '4 hours ago',
    location: 'National',
    status: 'Monitoring',
    priority: 'low',
    category: 'Service Usage'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'System Maintenance',
    date: 'March 15, 2024',
    time: '02:00 AM EST',
    type: 'maintenance'
  },
  {
    id: '2',
    title: 'Compliance Audit',
    date: 'March 20, 2024',
    time: '10:00 AM EST',
    type: 'audit'
  }
];

export default function Alerts() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterAlerts = () => {
    return alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getAlertsByType = (type: 'critical' | 'success' | 'monitoring') => {
    return filterAlerts().filter(alert => alert.type === type);
  };

  const categories = ['all', ...new Set(alerts.map(alert => alert.category))];

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.type === 'critical').length,
    resolved: alerts.filter(a => a.type === 'success').length,
    monitoring: alerts.filter(a => a.type === 'monitoring').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage system alerts, notifications, and trends
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold">{alertStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertOctagon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold">{alertStats.critical}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold">{alertStats.resolved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monitoring</p>
              <p className="text-2xl font-bold">{alertStats.monitoring}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Alerts Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Critical Alerts */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h2 className="text-base font-semibold">Critical Alerts</h2>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  {getAlertsByType('critical').length} Issues
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {getAlertsByType('critical').map(alert => (
                <div key={alert.id} className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-red-900">{alert.title}</h3>
                      <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-red-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {alert.time}
                        </span>
                        {alert.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed & Verified */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h2 className="text-base font-semibold">Completed & Verified</h2>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {getAlertsByType('success').length} Completed
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {getAlertsByType('success').map(alert => (
                <div key={alert.id} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-green-900">{alert.title}</h3>
                      <p className="text-sm text-green-700 mt-1">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {alert.time}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring & Trends */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h2 className="text-base font-semibold">Monitoring & Trends</h2>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {getAlertsByType('monitoring').length} Active
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {getAlertsByType('monitoring').map(alert => (
                <div key={alert.id} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">{alert.title}</h3>
                      <p className="text-sm text-blue-700 mt-1">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-blue-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {alert.time}
                        </span>
                        {alert.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      View Trend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Alert Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-base font-semibold mb-4">Alert Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Time</span>
                  <span className="font-medium">15 mins avg</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Resolution Rate</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-base font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mental Health Trends */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Mental Health Trends</h2>
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-sm font-medium text-purple-900">PTSD Assessments</h3>
                <p className="text-sm text-purple-700 mt-1">
                  15% increase in Western Region
                </p>
                <button className="mt-2 text-sm text-purple-600 hover:text-purple-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}