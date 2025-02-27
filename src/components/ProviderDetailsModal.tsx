import { X, ExternalLink } from 'lucide-react';

interface ProviderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    id: string;
    name: string;
    category: string;
    status: string;
    dataTypes: string[];
    lastSync: string;
  };
}

export default function ProviderDetailsModal({ isOpen, onClose, provider }: ProviderDetailsModalProps) {
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
            <h2 className="text-xl font-semibold">{provider.name}</h2>
            <p className="text-sm text-gray-600">{provider.category}</p>
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
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  provider.status === 'active' ? 'bg-green-500' :
                  provider.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <span className="capitalize">{provider.status}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Last Sync</h3>
              <p>{new Date(provider.lastSync).toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Data Types</h3>
              <div className="flex flex-wrap gap-2">
                {provider.dataTypes.map(type => (
                  <span
                    key={type}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Integration Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>API Status</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>Data Transfer</span>
                  <span className="text-blue-600">Active</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  View Provider Dashboard
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  Disconnect Provider
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}