import { useState } from 'react';
import { Calendar, Shield, AlertTriangle, CheckCircle2, FileText, Search } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  resource: string;
  status: 'Success' | 'Warning' | 'Error';
  details: string;
  ipAddress: string;
}

interface ComplianceCheck {
  id: string;
  name: string;
  status: 'Compliant' | 'Non-Compliant' | 'In Progress';
  lastCheck: string;
  nextCheck: string;
  framework: string;
  findings: number;
}

const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-02-24 10:45:23',
    action: 'Data Access',
    user: 'Dr. Sarah Johnson',
    resource: 'Patient Records',
    status: 'Success',
    details: 'Accessed medical history for patient ID: VA-2025-789',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2024-02-24 10:30:15',
    action: 'Authentication',
    user: 'System',
    resource: 'Login Service',
    status: 'Warning',
    details: 'Multiple failed login attempts detected',
    ipAddress: '192.168.1.105'
  },
  {
    id: '3',
    timestamp: '2024-02-24 10:15:45',
    action: 'Data Modification',
    user: 'Admin User',
    resource: 'System Settings',
    status: 'Success',
    details: 'Updated security policy settings',
    ipAddress: '192.168.1.110'
  },
  {
    id: '4',
    timestamp: '2024-02-24 10:00:30',
    action: 'API Access',
    user: 'External Service',
    resource: 'API Gateway',
    status: 'Error',
    details: 'Invalid API key used for authentication',
    ipAddress: '192.168.1.120'
  }
];

const complianceChecks: ComplianceCheck[] = [
  {
    id: '1',
    name: 'HIPAA Security Rule',
    status: 'Compliant',
    lastCheck: '2024-02-20',
    nextCheck: '2024-03-20',
    framework: 'Healthcare',
    findings: 0
  },
  {
    id: '2',
    name: 'Data Privacy Standards',
    status: 'In Progress',
    lastCheck: '2024-02-15',
    nextCheck: '2024-02-25',
    framework: 'Privacy',
    findings: 3
  },
  {
    id: '3',
    name: 'Security Controls',
    status: 'Non-Compliant',
    lastCheck: '2024-02-10',
    nextCheck: '2024-02-24',
    framework: 'Security',
    findings: 5
  },
  {
    id: '4',
    name: 'Access Management',
    status: 'Compliant',
    lastCheck: '2024-02-18',
    nextCheck: '2024-03-18',
    framework: 'Security',
    findings: 0
  }
];

export default function ComplianceAudit() {
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Compliance & Audit Logs</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Compliance & Audit Logs</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Schedule Audit
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-base font-semibold">Compliance Score</h3>
          </div>
          <p className="text-3xl font-bold">92%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="text-base font-semibold">Open Findings</h3>
          </div>
          <p className="text-3xl font-bold">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold">Checks Passed</h3>
          </div>
          <p className="text-3xl font-bold">45/50</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold">Audit Logs</h3>
          </div>
          <p className="text-3xl font-bold">1.2K</p>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Compliance Checks</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {complianceChecks.map((check) => (
              <div key={check.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold">{check.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        check.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                        check.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">Framework: {check.framework}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Last Check</p>
                        <p className="font-medium">{check.lastCheck}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Check</p>
                        <p className="font-medium">{check.nextCheck}</p>
                      </div>
                    </div>
                    {check.findings > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-red-600 text-sm">
                          {check.findings} finding{check.findings > 1 ? 's' : ''} to address
                        </p>
                      </div>
                    )}
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Audit Logs</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
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
        </div>

        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-4 text-sm">{log.timestamp}</td>
                  <td className="px-4 py-4">{log.action}</td>
                  <td className="px-4 py-4">{log.user}</td>
                  <td className="px-4 py-4">{log.resource}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'Success' ? 'bg-green-100 text-green-800' :
                      log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{log.details}</td>
                  <td className="px-4 py-4 font-mono text-sm">{log.ipAddress}</td>
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
      </div>
    </div>
  );
}