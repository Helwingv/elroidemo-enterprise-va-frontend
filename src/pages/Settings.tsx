import { Settings as SettingsIcon, Bell, Lock, UserCircle, Database, Globe } from 'lucide-react';
import { useState } from 'react';
import SettingsModal from '../components/SettingsModal';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: UserCircle,
    description: 'Manage your account information and preferences',
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    icon: Bell,
    description: 'Control how you receive updates and alerts',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Lock,
    description: 'Manage your security settings and privacy preferences',
  },
  {
    id: 'data',
    title: 'Data Management',
    icon: Database,
    description: 'Control your data sharing and storage preferences',
  },
  {
    id: 'integrations',
    title: 'Connected Services',
    icon: Globe,
    description: 'Manage your connected applications and services',
  },
];

export default function Settings() {
  const [selectedSection, setSelectedSection] = useState<typeof settingsSections[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfigure = (section: typeof settingsSections[0]) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <p className="text-gray-600 mt-1">{section.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleConfigure(section)}
                  className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Configure
                </button>
              </div>
            </div>
          );
        })}
        <SettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          section={selectedSection}
        />
      </div>
    </div>
  );
}