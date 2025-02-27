import { useNavigate } from 'react-router-dom';
import {
  Users, LineChart, Bell, GitMerge, FileCheck2, Building2, ClipboardList,
  ScrollText, Settings, Activity, Heart, Calendar, Shield, AlertTriangle, Download,
  CheckCircle2, FileText, ArrowRight
} from 'lucide-react';

interface ReportData {
  category: string;
  metric: string;
  value: string;
  timestamp: string;
}

const stats = [
  {
    title: 'Active Veterans',
    value: '2,451',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Data Providers',
    value: '85',
    change: '+5',
    changeType: 'positive',
    icon: Building2,
    color: 'green'
  },
  {
    title: 'Pending Alerts',
    value: '18',
    change: '-3',
    changeType: 'negative',
    icon: Bell,
    color: 'yellow'
  },
  {
    title: 'Compliance Score',
    value: '98%',
    change: '+2%',
    changeType: 'positive',
    icon: Shield,
    color: 'purple'
  }
];

const sections = [
  {
    title: 'Patient Profiles',
    description: 'View and manage veteran health records and profiles',
    icon: Users,
    path: '/patients',
    color: 'blue',
    metrics: [
      { label: 'Active Profiles', value: '2,451' },
      { label: 'Recent Updates', value: '125' }
    ]
  },
  {
    title: 'Alerts & Notifications',
    description: 'Monitor system alerts and veteran health notifications',
    icon: Bell,
    path: '/alerts',
    color: 'yellow',
    metrics: [
      { label: 'Pending Alerts', value: '18' },
      { label: 'Critical', value: '3' }
    ]
  },
  {
    title: 'Data Mapping',
    description: 'Track data integration and mapping status',
    icon: GitMerge,
    path: '/data-mapping',
    color: 'indigo',
    metrics: [
      { label: 'Successful Mappings', value: '24' },
      { label: 'Pending', value: '8' },
      { label: 'Errors', value: '3' },
      { label: 'Success Rate', value: '99.8%' }
    ]
  },
  {
    title: 'Consent Management',
    description: 'Manage data sharing agreements and consents',
    icon: FileCheck2,
    path: '/consent',
    color: 'green',
    metrics: [
      { label: 'Active Consents', value: '1,856' },
      { label: 'Pending Review', value: '45' }
    ]
  },
  {
    title: 'Providers',
    description: 'Manage healthcare providers and facilities',
    icon: Building2,
    path: '/providers',
    color: 'purple',
    metrics: [
      { label: 'Active Providers', value: '85' },
      { label: 'Connected', value: '78' }
    ]
  },
  {
    title: 'Benefits & Services',
    description: 'Track veteran benefits and service utilization',
    icon: ClipboardList,
    path: '/benefits',
    color: 'pink',
    metrics: [
      { label: 'Active Benefits', value: '3,421' },
      { label: 'Processing', value: '156' }
    ]
  }
];

const recentActivity = [
  {
    id: '1',
    type: 'alert',
    message: 'New critical health alert for patient #VA-2025-789',
    time: '5 minutes ago',
    icon: AlertTriangle,
    color: 'red'
  },
  {
    id: '2',
    type: 'update',
    message: 'Updated health records for 15 veterans',
    time: '1 hour ago',
    icon: FileText,
    color: 'blue'
  },
  {
    id: '3',
    type: 'success',
    message: 'Completed data mapping for VA Hospital System',
    time: '2 hours ago',
    icon: CheckCircle2,
    color: 'green'
  }
];

const generateReport = () => {
  // Compile report data
  const reportData: ReportData[] = [
    // Stats Overview
    ...stats.map(stat => ({
      category: 'Overview',
      metric: stat.title,
      value: stat.value,
      timestamp: new Date().toISOString()
    })),
    
    // Section Metrics
    ...sections.flatMap(section => 
      section.metrics.map(metric => ({
        category: section.title,
        metric: metric.label,
        value: metric.value,
        timestamp: new Date().toISOString()
      }))
    ),
    
    // Recent Activity
    ...recentActivity.map(activity => ({
      category: 'Recent Activity',
      metric: activity.type,
      value: activity.message,
      timestamp: activity.time
    }))
  ];

  // Create CSV content
  const headers = ['Category', 'Metric', 'Value', 'Timestamp'];
  const csvContent = [
    headers.join(','),
    ...reportData.map(row => [
      row.category,
      row.metric,
      `"${row.value.replace(/"/g, '""')}"`,
      row.timestamp
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `va_enterprise_report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">VA Health Enterprise</h1>
          <p className="text-gray-600 mt-2">
            Monitor veteran health data, compliance, and system performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <LineChart className="h-4 w-4" />
            View Insights
          </button>
          <button 
            onClick={generateReport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`p-3 bg-${stat.color}-50 rounded-xl`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-3">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-100 relative flex flex-col"
              onClick={() => navigate(section.path)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-${section.color}-50 rounded-xl`}>
                  <Icon className={`h-5 w-5 text-${section.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">{section.description}</p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {section.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                    <p className="text-base font-semibold text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto self-end">
                <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                  View More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2.5 bg-${activity.color}-50 rounded-xl`}>
                  <Icon className={`h-4 w-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}