import { useState } from 'react';
import { X } from 'lucide-react';

interface ProviderAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    id: string;
    name: string;
    logo: string;
    permissions: {
      labResults: boolean;
      medications: boolean;
      fitnessData: boolean;
    };
  };
  onUpdatePermissions: (providerId: string, permissions: { [key: string]: boolean }) => void;
  onDeleteProvider: (providerId: string) => void;
}

interface ProviderPermissions {
  labResults: boolean;
  medications: boolean;
  fitnessData: boolean;
}

interface Permission {
  key: keyof typeof defaultPermissions;
  title: string;
  description: string;
}

const defaultPermissions = {
  labResults: false,
  medications: false,
  fitnessData: false
};

const permissionsList: Permission[] = [
  {
    key: 'labResults',
    title: 'Lab Results',
    description: 'Access to your laboratory test results'
  },
  {
    key: 'medications',
    title: 'Medications',
    description: 'Access to your medication history'
  },
  {
    key: 'fitnessData',
    title: 'Fitness Data',
    description: 'Access to your fitness and activity data'
  }
];

export default function ProviderAccessModal({
  isOpen,
  onClose,
  provider,
  onUpdatePermissions,
  onDeleteProvider
}: ProviderAccessModalProps) {
  const [localPermissions, setLocalPermissions] = useState<ProviderPermissions>(provider.permissions);
  const [hasChanges, setHasChanges] = useState(false);

  if (!isOpen) return null;

  const handlePermissionToggle = (permission: string) => {
    setLocalPermissions(prev => {
      const updated = {
        ...prev,
        [permission]: !prev[permission as keyof ProviderPermissions]
      };
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(provider.permissions));
      return updated;
    });
  };

  const handleDelete = () => {
    onDeleteProvider(provider.id);
    onClose();
  };

  const handleSave = () => {
    onUpdatePermissions(provider.id, localPermissions);
    setHasChanges(false);
    onClose();
  };

  const handleCancel = () => {
    setLocalPermissions(provider.permissions);
    setHasChanges(false);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={provider.logo} alt={provider.name} className="w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p className="text-sm text-gray-600">Manage provider access</p>
            </div>
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
              <h3 className="text-lg font-medium mb-4">Data Access Permissions</h3>
              <div className="space-y-4">
                {permissionsList.map((permission) => (
                  <div key={permission.key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{permission.title}</h4>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                    <button
                      onClick={() => handlePermissionToggle(permission.key)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        localPermissions[permission.key] ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                      aria-checked={localPermissions[permission.key]}
                      role="switch"
                    >
                      <div
                        className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all ${
                          localPermissions[permission.key] ? 'left-[1.625rem]' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">
                Removing this provider will revoke all access to your health information. This action cannot be undone.
              </p>
              <button
                onClick={handleDelete}
                className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
              >
                Remove Provider Access
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-4 py-2 rounded-lg transition-colors ${
                hasChanges 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}