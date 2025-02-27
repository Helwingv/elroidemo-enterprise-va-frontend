import { useState } from 'react'; 
import { 
  Stethoscope, ExternalLink, Shield, AlertTriangle, CheckCircle2, RefreshCw, 
  Calendar, Search, MoreVertical, Activity, LineChart, ArrowUp, ArrowDown,
  FileText, RefreshCcw, X
} from 'lucide-react';

interface DataTransfer {
  time: string;
  dataType: string;
  status: 'Completed' | 'In Progress' | 'Warning' | 'Error';
  size: string;
  records: number;
  errors: number;
}

const recentTransfers: DataTransfer[] = [
  {
    time: '2 days ago',
    dataType: 'Medical History',
    status: 'Completed',
    size: '1.2 MB',
    records: 1,
    errors: 0
  },
  {
    time: '2 days ago',
    dataType: 'Prescription History',
    status: 'Completed',
    size: '0.8 MB',
    records: 1,
    errors: 0
  },
  {
    time: '2 days ago',
    dataType: 'Immunization Records',
    status: 'Completed',
    size: '0.3 MB',
    records: 1,
    errors: 0
  },
  {
    time: '2 days ago',
    dataType: 'Lab Results',
    status: 'Warning',
    size: '1.5 MB',
    records: 1,
    errors: 1
  },
  {
    time: '2 days ago',
    dataType: 'Vital Signs History',
    status: 'Error',
    size: '0.4 MB',
    records: 1,
    errors: 1
  }
];

interface DataTypeOverview {
  type: string;
  totalRecords: number;
  totalSize: string;
  lastTransfer: string;
}

const dataTypes: DataTypeOverview[] = [
  {
    type: 'Medical History',
    totalRecords: 1,
    totalSize: '1.2 MB',
    lastTransfer: '2 days ago'
  },
  {
    type: 'Prescription History',
    totalRecords: 1,
    totalSize: '0.8 MB',
    lastTransfer: '2 days ago'
  },
  {
    type: 'Immunization Records',
    totalRecords: 1,
    totalSize: '0.3 MB',
    lastTransfer: '2 days ago'
  },
  {
    type: 'Lab Results',
    totalRecords: 1,
    totalSize: '1.5 MB',
    lastTransfer: '2 days ago'
  },
  {
    type: 'Vital Signs History',
    totalRecords: 1,
    totalSize: '0.4 MB',
    lastTransfer: '2 days ago'
  }
];

interface DataQualityMetric {
  name: string;
  value: number;
  change: number;
  description: string;
  color: string;
}

const dataQualityMetrics: DataQualityMetric[] = [
  {
    name: 'Files Processed',
    value: 100,
    change: 0,
    description: '5 of 5 files processed successfully',
    color: 'green'
  },
  {
    name: 'Data Validation',
    value: 100,
    change: 0,
    description: 'All files passed validation',
    color: 'green'
  },
  {
    name: 'System Status',
    value: 100,
    change: 0,
    description: 'System ready for next sync',
    color: 'green'
  }
];

interface DataAlert {
  type: 'error' | 'warning';
  title: string;
  dataType: string;
  detectedDays: number;
}

const dataAlerts: DataAlert[] = [];

interface DataCompleteness {
  category: string;
  percentage: number;
}

const dataCompleteness: DataCompleteness[] = [
  { category: 'Demographics', percentage: 98 },
  { category: 'Medical History', percentage: 87 },
  { category: 'Lab Results', percentage: 92 },
  { category: 'Prescriptions', percentage: 95 },
  { category: 'Imaging', percentage: 76 }
];
interface ApiMetric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  color: string;
}

const apiMetrics: ApiMetric[] = [
  {
    name: 'Total Files',
    value: '5',
    change: 0,
    trend: 'up',
    color: 'blue'
  },
  {
    name: 'Success Rate',
    value: '100%',
    change: 0,
    trend: 'up',
    color: 'green'
  },
  {
    name: 'Last Sync',
    value: '2 days ago',
    change: 0,
    trend: 'down',
    color: 'gray'
  },
  {
    name: 'Error Rate',
    value: '0%',
    change: 0,
    trend: 'down',
    color: 'green'
  }
];

interface APIKey {
  name: string;
  accessLevel: string;
  createdBy: string;
  lastUsed: string;
  status: 'Active' | 'Expired' | 'Revoked' | 'Pending Activation';
}

const apiKeys: APIKey[] = [
  {
    name: 'VA Health Integration API',
    accessLevel: 'Full Access',
    createdBy: 'Jane Doe',
    lastUsed: '2 mins ago',
    status: 'Active'
  }
];

interface DataMappingStatus {
  id: string;
  veteranId: string;
  sourceSystem: string;
  dataType: string;
  status: 'complete' | 'pending' | 'error';
  lastUpdated: string;
  errorDetails?: string;
}

const dataMappingStatuses: DataMappingStatus[] = [
  {
    id: '1',
    veteranId: 'VA-2025-789',
    sourceSystem: 'VA Health System',
    dataType: 'Medical History',
    status: 'complete',
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    veteranId: 'VA-2025-789',
    sourceSystem: 'VA Health System',
    dataType: 'Lab Results',
    status: 'error',
    lastUpdated: '2 days ago',
    errorDetails: 'Data validation failed'
  },
  {
    id: '3',
    veteranId: 'VA-2025-789',
    sourceSystem: 'VA Health System',
    dataType: 'Vital Signs History',
    status: 'error',
    lastUpdated: '2 days ago'
  }
];

interface Provider {
  id: string;
  name: string;
  type: string;
  status: string;
  lastSync: string;
}

const initialProviders: Provider[] = [
  {
    id: '1',
    name: 'VA Health System',
    type: 'Government',
    status: 'Last sync: 2 days ago',
    lastSync: '2 days ago'
  }
];

interface AccessLog {
  status: 'Successful' | 'Permission Denied' | 'Failed Login Attempt' | 'Warning';
  time: string;
  userRole: string;
  userName: string;
  action: string;
  accessed: string;
  ipAddress: string;
}

const accessLogs: AccessLog[] = [
  {
    status: 'Successful',
    time: '10:45 AM',
    userRole: 'VA Caseworker',
    userName: 'Michael Lee',
    action: 'Viewed',
    accessed: 'Veteran Medical Records (VA-2025-789)',
    ipAddress: '192.168.1.45'
  },
  {
    status: 'Permission Denied',
    time: '10:30 AM',
    userRole: 'External Provider',
    userName: 'Dr. Emily Carter',
    action: 'Attempted Access',
    accessed: 'Mental Health Notes (Restricted)',
    ipAddress: '10.0.0.75'
  },
  {
    status: 'Failed Login Attempt',
    time: '9:50 AM',
    userRole: 'Unknown User',
    userName: 'N/A',
    action: 'Failed Login',
    accessed: 'N/A',
    ipAddress: '45.67.89.12'
  }
];

interface GenerateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyType: 'full' | 'client';
}

export default function DataMapping() {
  const [providersList, setProvidersList] = useState<Provider[]>(initialProviders);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'monitoring' | 'management'>('monitoring');
  const [activeManagementSubTab, setActiveManagementSubTab] = useState<'overview'>('overview');
  const [activeMonitoringSubTab, setActiveMonitoringSubTab] = useState<'real-time' | 'data-types' | 'alerts'>('real-time');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenerateKeyModalOpen, setIsGenerateKeyModalOpen] = useState(false);
  const [generateKeyType, setGenerateKeyType] = useState<'full' | 'client'>('full');

  const generateApiKey = () => {
    return 'ak_' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const GenerateKeyModal = ({ isOpen, onClose, keyType }: GenerateKeyModalProps) => {
    const [keyName, setKeyName] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');

    if (!isOpen) return null;

    const handleGenerate = () => {
      if (!keyName) return;
      setGeneratedKey(generateApiKey());
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Generate {keyType === 'full' ? 'Full Access' : 'Client-Only'} Key
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key Name
              </label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter key name"
              />
            </div>

            {generatedKey && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Generated Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={generatedKey}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedKey)}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Make sure to copy this key now. You won't be able to see it again.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={!keyName}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-800 bg-green-100';
      case 'In Progress':
        return 'text-blue-800 bg-blue-100';
      case 'Warning':
        return 'text-yellow-800 bg-yellow-100';
      case 'Error':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Mapping & Integration</h1>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeMainTab === 'monitoring'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMainTab('monitoring')}
          >
            Data Monitoring
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeMainTab === 'management'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMainTab('management')}
          >
            API Keys Management
          </button>
        </div>

        {activeMainTab === 'monitoring' && (
          <div className="p-6">
            {/* Monitoring Sub-tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeMonitoringSubTab === 'real-time'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveMonitoringSubTab('real-time')}
              >
                Real-time Monitoring
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeMonitoringSubTab === 'data-types'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveMonitoringSubTab('data-types')}
              >
                Data Types
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeMonitoringSubTab === 'alerts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveMonitoringSubTab('alerts')}
              >
                Alerts & Issues
              </button>
            </div>

            {/* API Metrics - Common to all tabs */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {apiMetrics.map((metric) => (
                <div key={metric.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.name}</span>
                    <div className={`flex items-center gap-1 text-${metric.color}-600`}>
                      {metric.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span className="text-xs">{metric.change}%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              ))}
            </div>

            {activeMonitoringSubTab === 'real-time' && (
              <>
                {/* API Usage Graph */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">API Usage</h3>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                      <option>Last 7 days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between">
                    {/* Each bar represents morning, noon, evening of each day */}
                    {[...Array(21)].map((_, i) => {
                      // Calculate which day this bar belongs to (i/3 gives us the day index)
                      const dayIndex = Math.floor(i/3);
                      // Tuesday is 2 days ago (index 2 from the end)
                      const isTuesday = dayIndex === 4;
                      // Calculate height based on whether it's Tuesday and what time of day
                      const height = isTuesday 
                        ? (i % 3 === 1 ? '60%' : '20%') // Higher at noon on Tuesday
                        : '0%';
                      
                      return (
                        <div
                          key={i}
                          className="w-4 bg-blue-500 rounded-t"
                          style={{
                            height: height,
                            opacity: 0.7
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span>Friday</span>
                    <span>Saturday</span>
                    <span>Sunday</span>
                    <span>Monday</span>
                    <span>Tuesday</span>
                    <span>Wednesday</span>
                    <span>Thursday</span>
                  </div>
                </div>

                {/* Replace Current Transfer Status with Idle Status */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCcw className="h-5 w-5 text-gray-400" />
                    <h3 className="font-medium text-gray-600">No Active Transfers</h3>
                  </div>
                  <p className="text-sm text-gray-500">Last transfer completed 2 days ago</p>
                </div>
              </>
            )}

            {activeMonitoringSubTab === 'data-types' && (
              <>
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-medium">Data Types Overview</h3>
                    <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                      Export Report
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500">
                          <th className="px-4 py-3">Data Type</th>
                          <th className="px-4 py-3">Total Records</th>
                          <th className="px-4 py-3">Total Size</th>
                          <th className="px-4 py-3">Last Transfer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {dataTypes.map((type, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{type.type}</td>
                            <td className="px-4 py-3">{type.totalRecords.toLocaleString()}</td>
                            <td className="px-4 py-3">{type.totalSize}</td>
                            <td className="px-4 py-3">{type.lastTransfer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Data Volume Chart */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-4">Data Volume by Type</h3>
                    <div className="h-64 flex items-end justify-between">
                      {dataTypes.map((type, index) => (
                        <div
                          key={index}
                          className="w-24 bg-blue-500 rounded-t"
                          style={{
                            height: `${30 + Math.random() * 70}%`,
                            opacity: 0.7 + (index / dataTypes.length) * 0.3
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                      {dataTypes.map((type, index) => (
                        <span key={index} className="text-xs">{type.type.split(' ')[0]}</span>
                      ))}
                    </div>
                  </div>

                  {/* Data Completeness */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-4">Patient Data Completeness</h3>
                    <div className="space-y-4">
                      {dataCompleteness.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.category}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeMonitoringSubTab === 'alerts' && (
              <>
                {/* Alerts List */}
                <div className="space-y-4 mb-6">
                  {dataAlerts.length === 0 ? (
                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium text-gray-700">No Active Alerts</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-7">All systems are operating normally</p>
                    </div>
                  ) : (
                    dataAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          alert.type === 'error' ? 'bg-red-50' : 'bg-yellow-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className={`h-5 w-5 ${
                                alert.type === 'error' ? 'text-red-600' : 'text-yellow-600'
                              }`} />
                              <h3 className={`font-medium ${
                                alert.type === 'error' ? 'text-red-900' : 'text-yellow-900'
                              }`}>
                                {alert.title}
                              </h3>
                            </div>
                            <div className={`mt-1 text-sm ${
                              alert.type === 'error' ? 'text-red-700' : 'text-yellow-700'
                            }`}>
                              <p>Data Type: {alert.dataType}</p>
                              <p>Detected {alert.detectedDays} days ago</p>
                            </div>
                          </div>
                          <button className="text-sm font-medium hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {/* Data Quality Metrics */}
                <h3 className="font-medium mb-4">Data Quality Metrics</h3>
                <div className="grid grid-cols-3 gap-6">
                  {dataQualityMetrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-${metric.color}-600 text-4xl font-bold`}>
                          {metric.value}%
                        </div>
                        <div className={`text-sm ${
                          metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}% from last month
                        </div>
                      </div>
                      <h4 className="font-medium">{metric.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeMainTab === 'management' && (
          <div className="p-6">
            {/* Existing API Keys Management Content */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex justify-end gap-3 mb-6">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => {
                      setGenerateKeyType('full');
                      setIsGenerateKeyModalOpen(true);
                    }}
                  >
                    <span>+</span> Generate Full Access Key
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => {
                      setGenerateKeyType('client');
                      setIsGenerateKeyModalOpen(true);
                    }}
                  >
                    <span>+</span> Generate Client-Only Key
                  </button>
                </div>
                <div className="mb-6">
                  <p className="mb-2">Full Access Key: Grants unrestricted API access for system-wide integrations and administrative use.</p>
                  <p>Client-Only Key: Provides limited access for specific transactions without full system privileges.</p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 bg-gray-50">
                        <th className="px-4 py-3 rounded-l-lg">Name</th>
                        <th className="px-4 py-3">Access Level</th>
                        <th className="px-4 py-3">Created By</th>
                        <th className="px-4 py-3">Last Used</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {apiKeys.map((key, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4">{key.name}</td>
                          <td className="px-4 py-4">{key.accessLevel}</td>
                          <td className="px-4 py-4">{key.createdBy}</td>
                          <td className="px-4 py-4">{key.lastUsed}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {key.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="relative">
                              <button 
                                className="p-1 hover:bg-gray-100 rounded-full"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                              >
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                              </button>
                              {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                    Delete API Key
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-6">
                    <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">1</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Mapping Status */}
      <div className="space-y-3">
        <h2 className="text-sm text-gray-600">Data Mapping Status - February 2025</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Complete</h3>
                <p className="text-sm text-gray-600">Successfully mapped records</p>
              </div>
              <span className="ml-auto text-2xl font-bold">24</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <RefreshCw className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Pending</h3>
                <p className="text-sm text-gray-600">Awaiting processing</p>
              </div>
              <span className="ml-auto text-2xl font-bold">0</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Errors</h3>
                <p className="text-sm text-gray-600">Require attention</p>
              </div>
              <span className="ml-auto text-2xl font-bold">0</span>
            </div>
          </div>
        </div>
      </div>
      <GenerateKeyModal
        isOpen={isGenerateKeyModalOpen}
        onClose={() => setIsGenerateKeyModalOpen(false)}
        keyType={generateKeyType}
      />
    </div>
  );
}