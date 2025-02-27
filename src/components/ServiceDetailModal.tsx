import { X, MapPin, Calendar, Clock, Users, FileText } from 'lucide-react';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    name: string;
    provider: string;
    description?: string;
    status: string;
    date: string;
    location: string;
    eligibility?: string[];
    requirements?: string[];
    coverage?: string[];
  };
}

export default function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-sm text-gray-600">{service.provider}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {service.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <h4 className="font-medium">Date</h4>
                </div>
                <p className="text-sm text-gray-600">{service.date}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <h4 className="font-medium">Status</h4>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  service.status === 'Available' ? 'bg-green-100 text-green-800' :
                  service.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                  service.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium">Location</h4>
              </div>
              <p className="text-sm text-gray-600">{service.location}</p>
            </div>

            {service.eligibility && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Eligibility Requirements</h3>
                <ul className="space-y-2">
                  {service.eligibility.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.requirements && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Required Documents</h3>
                <ul className="space-y-2">
                  {service.requirements.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gray-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.coverage && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Coverage Details</h3>
                <ul className="space-y-2">
                  {service.coverage.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Additional Information</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Service available to all eligible veterans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Processing time: 2-3 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            {service.status === 'Available' && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Service
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}