import { useState, useEffect } from 'react';
import { 
  Users, Heart, Activity, Brain, Stethoscope, FileCheck2, AlertTriangle, Download, Search, FileText, ArrowRight 
} from 'lucide-react';
import MedicalUpdatesModal from '../components/MedicalUpdatesModal';
import { supabase } from '../lib/supabase';

interface ExportableRecord {
  'Patient ID': string;
  'Name': string;
  'Date of Birth': string;
  'Blood Type': string;
  'Height': string;
  'Weight': string;
  'Provider': string;
  'Last Updated': string;
}

interface ConsentData {
  id: string;
  user_id: string;
  provider_id: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export default function PersonnelOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMedicalUpdatesModalOpen, setIsMedicalUpdatesModalOpen] = useState(false);
  const [consentData, setConsentData] = useState<ConsentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial consent data
    const fetchConsentData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_provider_consent')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching consent data:', error);
        } else if (data && data.length > 0) {
          setConsentData(data[0]);
        }
      } catch (err) {
        console.error('Error in consent data fetch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsentData();

    // Set up realtime subscription
    const subscription = supabase
      .channel('user_provider_consent-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_provider_consent'
        }, 
        (payload) => {
          console.log('Realtime change received:', payload);
          // Update consent data with new information
          setConsentData(payload.new as ConsentData);
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleExportRecords = () => {
    // Sample patient data for export
    const records: ExportableRecord[] = [
      {
        'Patient ID': 'VA-2025-789',
        'Name': 'Rachel Cash',
        'Date of Birth': '05/15/1995',
        'Blood Type': 'A+',
        'Height': "5'10\"",
        'Weight': '175 lbs',
        'Provider': 'Dr. Sarah Johnson',
        'Last Updated': '2024-02-24'
      }
    ];

    // Create CSV content
    const headers = Object.keys(records[0]);
    const csvContent = [
      headers.join(','),
      ...records.map(record => 
        headers.map(header => 
          // Wrap values in quotes and escape existing quotes
          `"${String(record[header as keyof ExportableRecord]).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `va_personnel_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date to a user-friendly format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">VA Personnel Overview</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search veteran by name, SSN, or service history"
              className="w-96 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Veteran Profile Section */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Veteran Profile</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExportRecords}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Records
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <img
                src="https://media.licdn.com/dms/image/v2/C5603AQHUnIP-MG66Hw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1603144231874?e=1746057600&v=beta&t=ukN49pNmx_hXz0Qk619zPBN1AayRmDGjLh6eHTu2ry4"
                alt="Veteran profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">Rachel Cash</h3>
                <p className="text-gray-600">ID P12345</p>
                <p className="text-gray-600">ID: VA-2025-789 • DOB: 05/15/1995</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Blood Type</h4>
                <p className="text-lg font-semibold">A+</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Height</h4>
                <p className="text-lg font-semibold">5'10"</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Weight</h4>
                <p className="text-lg font-semibold">175 lbs</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Health Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Check-up</span>
                  <span className="text-sm font-medium text-gray-700">1/15/25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Benefits Status</span>
                  <span className="text-sm font-medium text-gray-700">Enrolled</span>
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Consent Management</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">External Access</span>
                  {loading ? (
                    <span className="text-sm">Loading...</span>
                  ) : (
                    <span className={`font-medium ${consentData?.approved ? 'text-green-600' : 'text-red-600'}`}>
                      {consentData?.approved ? 'Authorized' : 'Unauthorized'}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Authorization Date</span>
                  <span className="text-sm font-medium text-gray-700">
                    {consentData?.approved ? formatDate(consentData.created_at) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatDate(consentData?.updated_at || '')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Medical Updates</h2>
              <button 
                onClick={() => setIsMedicalUpdatesModalOpen(true)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View More <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Lab Results</p>
                    <p className="text-sm text-gray-600">Blood work results available</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Normal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-900">Security Alert</h3>
                  <p className="text-sm text-red-700 mt-1">Failed data transfer detected</p>
                </div>
                <button className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Resolve
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Tasks</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Mark all as read
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        High Priority
                      </span>
                    </div>
                    <p className="text-sm">Review medical history for VA Client #4521</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Mark Complete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Pending Verifications</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Urgent
                      </span>
                    </div>
                    <p className="text-sm text-gray-900">
                      Benefits data mapping discrepancy #2458
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                      Dispute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MedicalUpdatesModal 
        isOpen={isMedicalUpdatesModalOpen}
        onClose={() => setIsMedicalUpdatesModalOpen(false)}
        patientId="VA-2025-789"
        patientName="John Doe"
      />
    </div>
  );
}