import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: {
    id: string;
    title: string;
    description: string;
  } | null;
}

export default function SettingsModal({ isOpen, onClose, section }: SettingsModalProps) {
  if (!isOpen || !section) return null;

  const renderContent = () => {
    switch (section.id) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your display name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {['Email', 'Push', 'SMS'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{type} Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications via {type.toLowerCase()}</p>
                </div>
                <button
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200"
                  role="switch"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Sharing</h4>
                <p className="text-sm text-gray-500">Control how your data is shared</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Configure
              </button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Data Storage</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Used Space</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[45%]" />
                </div>
              </div>
            </div>
            <button className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
              Clear All Data
            </button>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-4">
            {['Google Fit', 'Apple Health', 'Fitbit'].map((service) => (
              <div key={service} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{service}</h4>
                  <p className="text-sm text-gray-500">Connect your {service} account</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Connect
                </button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {renderContent()}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}