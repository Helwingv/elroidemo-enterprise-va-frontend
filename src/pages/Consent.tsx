import { useState } from 'react';
import { Calendar } from 'lucide-react';
import RequestAccessModal from '../components/RequestAccessModal';

interface AuditLogEntry {
  status: 'Successful' | 'Failed' | 'Warning' | 'Success';
  time: string;
  method: string;
  resourcePath: string;
  responseCode: string;
  responseTime: string;
  endpoint: string;
  job: string;
}

const auditLogs: AuditLogEntry[] = [
  {
    status: 'Successful',
    time: '10:45 AM',
    method: 'GET',
    resourcePath: '/veteran/1234/records',
    responseCode: '200 OK',
    responseTime: '120ms',
    endpoint: 'health.va.gov',
    job: 'Fetch Medical History'
  },
  {
    status: 'Failed',
    time: '10:30 AM',
    method: 'GET',
    resourcePath: '/veteran/5678/benefits',
    responseCode: '500 Server Error',
    responseTime: '250ms',
    endpoint: 'benefits.va.gov',
    job: 'Retrieve VA Benefits'
  },
  {
    status: 'Success',
    time: '10:15 AM',
    method: 'GET',
    resourcePath: '/appointments/upcoming',
    responseCode: '200 OK',
    responseTime: '98ms',
    endpoint: 'appointments.va.gov',
    job: 'Load Scheduled Visits'
  },
  {
    status: 'Warning',
    time: '10:05 AM',
    method: 'GET',
    resourcePath: '/medications/active',
    responseCode: '401 Unauthorized',
    responseTime: '180ms',
    endpoint: 'pharmacy.va.gov',
    job: 'Check Prescriptions'
  },
  {
    status: 'Success',
    time: '9:50 AM',
    method: 'GET',
    resourcePath: '/veteran/records/insurance',
    responseCode: '200 OK',
    responseTime: '132ms',
    endpoint: 'insurance.va.gov',
    job: 'Retrieve Insurance Details'
  },
  {
    status: 'Success',
    time: '9:30 AM',
    method: 'GET',
    resourcePath: '/veteran/emergency_contacts',
    responseCode: '200 OK',
    responseTime: '87ms',
    endpoint: 'contact.va.gov',
    job: 'Fetch Emergency Contacts'
  },
  {
    status: 'Failed',
    time: '9:10 AM',
    method: 'GET',
    resourcePath: '/provider/availability',
    responseCode: '404 Not Found',
    responseTime: '300ms',
    endpoint: 'provider.va.gov',
    job: 'Check Provider Schedule'
  },
  {
    status: 'Success',
    time: '8:55 AM',
    method: 'GET',
    resourcePath: '/veteran/lab_results',
    responseCode: '403 Forbidden',
    responseTime: '145ms',
    endpoint: 'consent.va.gov',
    job: 'Retrieve Lab Results'
  },
  {
    status: 'Warning',
    time: '8:30 AM',
    method: 'GET',
    resourcePath: '/veteran/data_sharing',
    responseCode: '200 OK',
    responseTime: '220ms',
    endpoint: 'finance.va.gov',
    job: 'Check Data Consent'
  },
];

export default function Consent() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const handleAccessRequest = (data: {
    purpose: string;
    dataTypes: string[];
    duration: string;
    additionalNotes: string;
  }) => {
    // Handle the access request
    console.log('Access request:', data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Consent Management</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Data Sharing & Consent Management</h1>

      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Veteran Data Access Overview */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Veteran Data Access Overview</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg">Filter</button>
                <button 
                  onClick={() => setIsRequestModalOpen(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Request Access
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Current Access</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop"
                  alt="Dr. Sarah Johnson"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">VA Medical Provider</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Medical History</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Treatment Plans</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Benefits</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Access Requests</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="Mark Wilson"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">Mark Wilson</h4>
                  <p className="text-sm text-gray-600">External Healthcare Provider</p>
                  <p className="text-sm text-gray-600 mt-1">Requesting access to: Medical History, Current Medications</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">Pending</span>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm">Deny</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Approve</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Management */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Consent Management</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Data Sharing Agreement</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
                </div>
                <p className="text-sm text-gray-600">Expires: Dec 31, 2025</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm">🔒 HIPAA Compliant</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Compliance Verification</h3>
                  <span className="text-sm">✓ Verified</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Smart Contract Status</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <RequestAccessModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleAccessRequest}
      />

      {/* Audit Log */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Audit Log</h2>
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
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Resource Path</th>
              <th className="px-4 py-3">Response Code</th>
              <th className="px-4 py-3">Response Time</th>
              <th className="px-4 py-3">Endpoint</th>
              <th className="px-4 py-3">Job</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {auditLogs.map((log, index) => (
              <tr key={index}>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    log.status === 'Successful' || log.status === 'Success' ? 'bg-green-100 text-green-800' :
                    log.status === 'Failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-4">{log.time}</td>
                <td className="px-4 py-4">{log.method}</td>
                <td className="px-4 py-4 font-mono text-sm">{log.resourcePath}</td>
                <td className="px-4 py-4">{log.responseCode}</td>
                <td className="px-4 py-4">{log.responseTime}</td>
                <td className="px-4 py-4">{log.endpoint}</td>
                <td className="px-4 py-4">{log.job}</td>
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
  );
}