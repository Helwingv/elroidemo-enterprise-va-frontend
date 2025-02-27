import { useState } from 'react';
import { X, FileText, Calendar, Search, Filter, Download, ArrowRight, Clock, Activity, Heart } from 'lucide-react';

interface MedicalUpdate {
  id: string;
  type: string;
  name: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical' | 'pending';
  details?: string;
  value?: string;
  unit?: string;
  referenceRange?: string;
}

interface MedicalUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
}

const mockMedicalUpdates: MedicalUpdate[] = [
  {
    id: '1',
    type: 'Lab Result',
    name: 'Complete Blood Count (CBC)',
    date: '2024-02-20',
    status: 'normal',
    details: 'All values within normal range',
    value: 'Multiple values',
    referenceRange: 'Various'
  },
  {
    id: '2',
    type: 'Lab Result',
    name: 'Comprehensive Metabolic Panel',
    date: '2024-02-20',
    status: 'abnormal',
    details: 'Elevated glucose levels detected',
    value: '145 mg/dL',
    unit: 'mg/dL',
    referenceRange: '70-99 mg/dL'
  },
  {
    id: '3',
    type: 'Vital Signs',
    name: 'Blood Pressure',
    date: '2024-02-18',
    status: 'normal',
    value: '120/80',
    unit: 'mmHg',
    referenceRange: '<140/90 mmHg'
  },
  {
    id: '4',
    type: 'Imaging',
    name: 'Chest X-Ray',
    date: '2024-02-15',
    status: 'pending',
    details: 'Awaiting radiologist review'
  },
  {
    id: '5',
    type: 'Lab Result',
    name: 'Hemoglobin A1C',
    date: '2024-02-10',
    status: 'abnormal',
    value: '6.8',
    unit: '%',
    referenceRange: '<5.7%',
    details: 'Indicates pre-diabetes'
  }
];

export default function MedicalUpdatesModal({ isOpen, onClose, patientId, patientName }: MedicalUpdatesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!isOpen) return null;

  const filters = ['All', 'Lab Result', 'Vital Signs', 'Imaging', 'Medication'];

  const filteredUpdates = mockMedicalUpdates
    .filter(update => {
      const matchesSearch = searchQuery === '' || 
        update.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.type.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFilter = !selectedFilter || selectedFilter === 'All' || update.type === selectedFilter;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case 'Lab Result':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'Vital Signs':
        return <Activity className="h-5 w-5 text-green-600" />;
      case 'Imaging':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleExportResults = () => {
    // Create CSV content
    const headers = ['Type', 'Name', 'Date', 'Status', 'Value', 'Unit', 'Reference Range', 'Details'];
    const csvContent = [
      headers.join(','),
      ...filteredUpdates.map(update => [
        update.type,
        update.name,
        update.date,
        update.status,
        update.value || '',
        update.unit || '',
        update.referenceRange || '',
        update.details || ''
      ].map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `medical_updates_${patientId}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl bg-white rounded-xl shadow-xl z-50 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">Recent Medical Updates</h2>
            <p className="text-sm text-gray-600">Patient: {patientName} (ID: {patientId})</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search medical updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter:</span>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter === 'All' ? null : filter)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    (filter === 'All' && !selectedFilter) || selectedFilter === filter
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <Calendar className="h-4 w-4" />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </button>
            
            <button
              onClick={handleExportResults}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6">
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No medical updates match your search criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUpdates.map(update => (
                <div 
                  key={update.id} 
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {getIconForType(update.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{update.name}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusStyle(update.status)}`}>
                            {update.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(update.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <span>{update.type}</span>
                        </div>
                        {update.details && (
                          <p className="text-sm text-gray-600 mt-2">{update.details}</p>
                        )}
                        {update.value && (
                          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Value</p>
                              <p className="font-medium">{update.value} {update.unit}</p>
                            </div>
                            {update.referenceRange && (
                              <div>
                                <p className="text-gray-500">Reference Range</p>
                                <p className="font-medium">{update.referenceRange}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}