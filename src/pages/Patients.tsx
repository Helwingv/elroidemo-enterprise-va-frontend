import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download } from 'lucide-react';

interface ExportablePatient {
  ID: string;
  Name: string;
  'Date of Birth': string;
  'Last Visit': string;
  Status: string;
  Provider: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Pending';
  provider: string;
  image: string;
}

const patients: Patient[] = [
  {
    id: 'VA-2025-789',
    name: 'Rachel Cash',
    dateOfBirth: '1995-05-15',
    lastVisit: '2024-02-15',
    status: 'Active',
    provider: 'Dr. Sarah Johnson',
    image: 'https://media.licdn.com/dms/image/v2/C5603AQHUnIP-MG66Hw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1603144231874?e=1746057600&v=beta&t=ukN49pNmx_hXz0Qk619zPBN1AayRmDGjLh6eHTu2ry4'
  },
  {
    id: 'VA-2025-790',
    name: 'Jane Smith',
    dateOfBirth: '1980-08-22',
    lastVisit: '2024-02-10',
    status: 'Active',
    provider: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&fit=crop&crop=faces'
  },
  {
    id: 'VA-2025-791',
    name: 'Robert Wilson',
    dateOfBirth: '1968-03-30',
    lastVisit: '2024-01-28',
    status: 'Inactive',
    provider: 'Dr. Emily Carter',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&fit=crop&crop=faces'
  }
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.id.toLowerCase().includes(searchLower) ||
      patient.provider.toLowerCase().includes(searchLower)
    );
  });

  const handleExport = () => {
    // Convert patients data to CSV format
    const exportData: ExportablePatient[] = filteredPatients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      'Date of Birth': patient.dateOfBirth,
      'Last Visit': patient.lastVisit,
      Status: patient.status,
      Provider: patient.provider
    }));

    // Create CSV content
    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        headers.map(header => 
          // Wrap values in quotes and escape existing quotes
          `"${String(row[header as keyof ExportablePatient]).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `patient_profiles_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Patient Profiles</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Patient Profiles</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Date of Birth</th>
                <th className="px-4 py-3">Last Visit</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{patient.id}</td>
                  <td className="px-4 py-4">{patient.dateOfBirth}</td>
                  <td className="px-4 py-4">{patient.lastVisit}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{patient.provider}</td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => navigate(`/personnel/${patient.id}`)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Profile
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
      </div>
    </div>
  );
}