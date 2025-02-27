import { useState } from 'react'; 
import { 
  Stethoscope, ExternalLink, Shield, AlertTriangle, CheckCircle2, RefreshCw, 
  Calendar, Search, MoreVertical, Activity, LineChart, ArrowUp, ArrowDown,
  FileText, RefreshCcw
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
    time: '2:32:00 PM',
    dataType: 'Patient Records',
    status: 'Completed',
    size: '2.4 MB',
    records: 156,
    errors: 0
  },
  {
    time: '2:15:00 PM',
    dataType: 'Lab Results',
    status: 'Completed',
    size: '8.7 MB',
    records: 43,
    errors: 0
  },
  {
    time: '2:05:00 PM',
    dataType: 'Medical Images',
    status: 'In Progress',
    size: '24.2 MB',
    records: 12,
    errors: 0
  },
  {
    time: '1:45:00 PM',
    dataType: 'Prescription Data',
    status: 'Warning',
    size: '1.1 MB',
    records: 78,
    errors: 3
  },
  {
    time: '1:22:00 PM',
    dataType: 'Patient Records',
    status: 'Error',
    size: '1.8 MB',
    records: 112,
    errors: 8
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
    type: 'Patient Records',
    totalRecords: 1245,
    totalSize: '24.6 MB',
    lastTransfer: 'Apr 15, 2024 2:32 PM'
  },
  {
    type: 'Lab Results',
    totalRecords: 532,
    totalSize: '78.3 MB',
    lastTransfer: 'Apr 15, 2024 2:15 PM'
  },
  {
    type: 'Medical Images',
    totalRecords: 128,
    totalSize: '1.2 GB',
    lastTransfer: 'Apr 15, 2024 2:05 PM'
  },
  {
    type: 'Prescription Data',
    totalRecords: 876,
    totalSize: '12.4 MB',
    lastTransfer: 'Apr 15, 2024 1:45 PM'
  },
  {
    type: 'Billing Information',
    totalRecords: 432,
    totalSize: '8.7 MB',
    lastTransfer: 'Apr 15, 2024 12:30 PM'
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
    name: 'Completeness',
    value: 94,
    change: 2,
    description: 'Records with all required fields',
    color: 'green'
  },
  {
    name: 'Accuracy',
    value: 98,
    change: 1,
    description: 'Records with valid data formats',
    color: 'green'
  },
  {
    name: 'Consistency',
    value: 89,
    change: -3,
    description: 'Records with consistent data',
    color: 'yellow'
  }
];

interface DataAlert {
  type: 'error' | 'warning';
  title: string;
  dataType: string;
  detectedDays: number;
}

const dataAlerts: DataAlert[] = [
  {
    type: 'error',
    title: 'Missing patient identifier in 8 records',
    dataType: 'Patient Records',
    detectedDays: 317
  },
  {
    type: 'warning',
    title: 'Potential data duplication detected',
    dataType: 'Prescription Data',
    detectedDays: 317
  },
  {
    type: 'warning',
    title: 'Unusual data volume spike detected',
    dataType: 'Lab Results',
    detectedDays: 317
  }
];

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
    name: 'Total Requests',
    value: '2.4M',
    change: 12,
    trend: 'up',
    color: 'blue'
  },
  {
    name: 'Success Rate',
    value: '99.8%',
    change: 0.5,
    trend: 'up',
    color: 'green'
  },
  {
    name: 'Avg Response Time',
    value: '245ms',
    change: 15,
    trend: 'down',
    color: 'yellow'
  },
  {
    name: 'Error Rate',
    value: '0.2%',
    change: 0.1,
    trend: 'down',
    color: 'red'
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
    name: 'Veteran Data API',
    accessLevel: 'Full Access',
    createdBy: 'John Doe',
    lastUsed: '2 mins ago',
    status: 'Active'
  },
  {
    name: 'Health Services API',
    accessLevel: 'Read-Only',
    createdBy: 'Jane Smith',
    lastUsed: '1 day ago',
    status: 'Expired'
  },
  {
    name: 'Claims Processing API',
    accessLevel: 'Full Access',
    createdBy: 'John Smith',
    lastUsed: '5 mins ago',
    status: 'Active'
  },
  {
    name: 'Pharmacy Data API',
    accessLevel: 'Full Access',
    createdBy: 'Emily Carter',
    lastUsed: '3 days ago',
    status: 'Expired'
  },
  {
    name: 'Benefits Eligibility API',
    accessLevel: 'Read-Only',
    createdBy: 'Michael Lee',
    lastUsed: '10 mins ago',
    status: 'Active'
  },
  {
    name: 'Telehealth Access API',
    accessLevel: 'Full Access',
    createdBy: 'Sarah Johnson',
    lastUsed: '2 weeks ago',
    status: 'Revoked'
  },
  {
    name: 'Medical Records API',
    accessLevel: 'Read-Only',
    createdBy: 'Robert Williams',
    lastUsed: '30 mins ago',
    status: 'Active'
  },
  {
    name: 'Scheduling API',
    accessLevel: 'Full Access',
    createdBy: 'Lisa Thompson',
    lastUsed: '4 hours ago',
    status: 'Pending Activation'
  },
  {
    name: 'Provider Directory API',
    accessLevel: 'Read-Only',
    createdBy: 'Kevin Brown',
    lastUsed: '6 days ago',
    status: 'Expired'
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
    dataType: 'Medical Records',
    status: 'complete',
    lastUpdated: '2024-02-24 10:30:00'
  },
  {
    id: '2',
    veteranId: 'VA-2025-789',
    sourceSystem: 'External Provider',
    dataType: 'Lab Results',
    status: 'error',
    lastUpdated: '2024-02-24 09:15:00',
    errorDetails: 'Data format mismatch detected'
  },
  {
    id: '3',
    veteranId: 'VA-2025-790',
    sourceSystem: 'Wearable Device',
    dataType: 'Health Metrics',
    status: 'pending',
    lastUpdated: '2024-02-24 11:00:00'
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
    status: 'Active',
    lastSync: '2 hours ago'
  },
  {
    id: '2',
    name: 'HealthTech Solutions',
    type: 'Private',
    status: 'Pending',
    lastSync: 'Never'
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

export default function DataMapping() {
  const [providersList, setProvidersList] = useState<Provider[]>(initialProviders);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'monitoring' | 'management'>('monitoring');
  const [activeManagementSubTab, setActiveManagementSubTab] = useState<'overview' | 'logs'>('overview');
  const [activeMonitoringSubTab, setActiveMonitoringSubTab] = useState<'real-time' | 'data-types' | 'alerts'>('real-time');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

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
            API Key Monitoring
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
                      <option>Last 24 hours</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 bg-blue-500 rounded-t"
                        style={{
                          height: `${Math.random() * 100}%`,
                          opacity: 0.7 + (i / 24) * 0.3
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                  </div>
                </div>

                {/* Recent Data Transfers */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-medium">Recent Data Transfers</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <RefreshCcw className="h-4 w-4" />
                      Auto-refreshing every 30s
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500">
                          <th className="px-4 py-3">Time</th>
                          <th className="px-4 py-3">Data Type</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Size</th>
                          <th className="px-4 py-3">Records</th>
                          <th className="px-4 py-3">Errors</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {recentTransfers.map((transfer, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{transfer.time}</td>
                            <td className="px-4 py-3">{transfer.dataType}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                                {transfer.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{transfer.size}</td>
                            <td className="px-4 py-3">{transfer.records}</td>
                            <td className="px-4 py-3">{transfer.errors}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Current Transfer Status */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCcw className="h-5 w-5 text-blue-600 motion-preset-spin" />
                    <h3 className="font-medium">Medical Images Transfer in Progress</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">12 records (24.2 MB) - Started at 2:05 PM</p>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }} />
                  </div>
                  <p className="text-sm text-right mt-1 text-blue-600">58% Complete</p>
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
                  {dataAlerts.map((alert, index) => (
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
                  ))}
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
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <span>+</span> Generate Full Access Key
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <span>+</span> Generate Client-Only Key
                  </button>
                </div>
                <div className="mb-6">
                  <p className="mb-2">Full Access Key: Grants unrestricted API access for system-wide integrations and administrative use.</p>
                  <p>Client-Only Key: Provides limited access for specific transactions without full system privileges.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Name</div>
                      <div>Sample API Key</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Value</div>
                      <div className="font-mono">9f1a3e7b-d2c8-42e4-bf5a-81a0e9a6c123</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Access Level</div>
                      <div>Read-Only (Sandbox)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Created</div>
                      <div>02/24/2026, 10:15 AM<br />by John Doe</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Name</div>
                      <div>PoA</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Value</div>
                      <div className="font-mono">ac4e1b5d-7f29-482a-b8d1-cf3b2a5e9f44</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Access Level</div>
                      <div>Limited Proxy Access<br />(Medical Records & Benefits)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Created</div>
                      <div>02/24/2026, 3:30 AM<br />by John Doe</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeManagementSubTab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveManagementSubTab('overview')}
                  >
                    API Keys Overview
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeManagementSubTab === 'logs'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveManagementSubTab('logs')}
                  >
                    Usage & Access Logs
                  </button>
                </div>

                {activeManagementSubTab === 'overview' ? (
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
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                key.status === 'Active' ? 'bg-green-100 text-green-800' :
                                key.status === 'Expired' ? 'bg-gray-100 text-gray-800' :
                                key.status === 'Revoked' ? 'bg-gray-100 text-gray-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {key.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <button className="p-1 hover:bg-gray-100 rounded-full">
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center mt-6 gap-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">1</button>
                      <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg">2</button>
                      <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg">3</button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                          />
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 bg-gray-50">
                          <th className="px-4 py-3 rounded-l-lg">Status</th>
                          <th className="px-4 py-3">Time</th>
                          <th className="px-4 py-3">User Role</th>
                          <th className="px-4 py-3">User Name</th>
                          <th className="px-4 py-3">Action</th>
                          <th className="px-4 py-3">Accessed</th>
                          <th className="px-4 py-3 rounded-r-lg">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {accessLogs.map((log, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                log.status === 'Successful' ? 'bg-green-100 text-green-800' :
                                log.status === 'Permission Denied' ? 'bg-red-100 text-red-800' :
                                log.status === 'Failed Login Attempt' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {log.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">{log.time}</td>
                            <td className="px-4 py-4">{log.userRole}</td>
                            <td className="px-4 py-4">{log.userName}</td>
                            <td className="px-4 py-4">{log.action}</td>
                            <td className="px-4 py-4">{log.accessed}</td>
                            <td className="px-4 py-4">{log.ipAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center mt-6 gap-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">1</button>
                      <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg">2</button>
                      <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 rounded-lg">3</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Mapping Status */}
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
            <span className="ml-auto text-2xl font-bold">8</span>
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
            <span className="ml-auto text-2xl font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Data Mapping Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Data Mapping Status</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3">Veteran ID</th>
                <th className="px-4 py-3">Source System</th>
                <th className="px-4 py-3">Data Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataMappingStatuses.map((status) => (
                <tr key={status.id}>
                  <td className="px-4 py-4">{status.veteranId}</td>
                  <td className="px-4 py-4">{status.sourceSystem}</td>
                  <td className="px-4 py-4">{status.dataType}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status.status === 'complete' ? 'bg-green-100 text-green-800' :
                      status.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">{status.lastUpdated}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        View Details
                      </button>
                      {status.status === 'error' && (
                        <button className="text-red-600 hover:text-red-700">
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {providersList.map((provider) => (
          <div key={provider.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Last Sync</p>
                  <p className="font-medium">{provider.lastSync}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sync Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}