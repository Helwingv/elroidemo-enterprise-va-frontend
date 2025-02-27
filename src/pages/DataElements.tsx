import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface DataElement {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  sections: {
    id: string;
    title: string;
    elements: DataElement[];
  }[];
}

interface Section {
  id: string;
  title: string;
  isOpen?: boolean;
}

const categories = [
  {
    id: 'general',
    name: 'General',
    description: 'Basic personal and demographic information',
    sections: [
      {
        id: 'personal',
        title: 'Personal Information',
        elements: [
          {
            id: '1',
            name: 'Full Name',
            description: 'Legal name as it appears on official documents',
            status: 'active',
            lastUpdated: '2024-02-20'
          },
          {
            id: '2',
            name: 'Date of Birth',
            description: 'Date of birth for age verification and identity',
            status: 'active',
            lastUpdated: '2024-02-20'
          }
        ]
      },
      {
        id: 'contact',
        title: 'Contact Information',
        elements: [
          {
            id: '3',
            name: 'Email Address',
            description: 'Primary email for communications',
            status: 'active',
            lastUpdated: '2024-02-20'
          },
          {
            id: '4',
            name: 'Phone Number',
            description: 'Primary contact number',
            status: 'active',
            lastUpdated: '2024-02-20'
          }
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical and health-related information',
    sections: [
      {
        id: 'medical',
        title: 'Medical History',
        elements: [
          {
            id: '5',
            name: 'Conditions',
            description: 'Current and past medical conditions',
            status: 'active',
            lastUpdated: '2024-02-21'
          },
          {
            id: '6',
            name: 'Medications',
            description: 'Current medication list and history',
            status: 'active',
            lastUpdated: '2024-02-21'
          }
        ]
      },
      {
        id: 'vitals',
        title: 'Vital Signs',
        elements: [
          {
            id: '7',
            name: 'Blood Pressure',
            description: 'Systolic and diastolic readings',
            status: 'active',
            lastUpdated: '2024-02-21'
          },
          {
            id: '8',
            name: 'Heart Rate',
            description: 'Pulse measurements',
            status: 'active',
            lastUpdated: '2024-02-21'
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational background and certifications',
    sections: [
      {
        id: 'academic',
        title: 'Academic History',
        elements: [
          {
            id: '9',
            name: 'Degrees',
            description: 'Academic degrees and certifications',
            status: 'active',
            lastUpdated: '2024-02-22'
          },
          {
            id: '10',
            name: 'Institutions',
            description: 'Educational institutions attended',
            status: 'active',
            lastUpdated: '2024-02-22'
          }
        ]
      }
    ]
  },
  {
    id: 'record',
    name: 'Record',
    description: 'Historical records and documentation',
    sections: [
      {
        id: 'documents',
        title: 'Official Documents',
        elements: [
          {
            id: '11',
            name: 'Identification',
            description: 'Government-issued ID information',
            status: 'active',
            lastUpdated: '2024-02-23'
          },
          {
            id: '12',
            name: 'Certifications',
            description: 'Professional certifications and licenses',
            status: 'active',
            lastUpdated: '2024-02-23'
          }
        ]
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Business and transaction-related data',
    sections: [
      {
        id: 'transactions',
        title: 'Transaction History',
        elements: [
          {
            id: '13',
            name: 'Purchases',
            description: 'Purchase history and preferences',
            status: 'active',
            lastUpdated: '2024-02-24'
          },
          {
            id: '14',
            name: 'Subscriptions',
            description: 'Active and past subscriptions',
            status: 'active',
            lastUpdated: '2024-02-24'
          }
        ]
      }
    ]
  },
  {
    id: 'inference',
    name: 'Inference',
    description: 'Derived and analyzed information',
    sections: [
      {
        id: 'analytics',
        title: 'Analytics',
        elements: [
          {
            id: '15',
            name: 'Health Score',
            description: 'Calculated health and wellness metrics',
            status: 'active',
            lastUpdated: '2024-02-25'
          },
          {
            id: '16',
            name: 'Risk Assessment',
            description: 'Predicted health risk factors',
            status: 'active',
            lastUpdated: '2024-02-25'
          }
        ]
      }
    ]
  }
];

export default function DataElements() {
  const [activeCategory, setActiveCategory] = useState('healthcare');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const activeData = categories.find(cat => cat.id === activeCategory);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Your Data Elements</span>
      </div>

      <h1 className="text-4xl font-bold mb-8">Your Data Elements</h1>

      {/* Category Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeCategory === category.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Collapsible Sections */}
      {activeData && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">{activeData.name}</h2>
            <p className="text-blue-700">{activeData.description}</p>
          </div>

          <div className="space-y-4">
            {activeData.sections.map(section => (
              <div key={section.id} className="bg-white rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="text-lg font-medium">{section.title}</span>
                  <ChevronUp
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openSections.has(section.id) ? '' : 'transform rotate-180'
                    }`}
                  />
                </button>
                {openSections.has(section.id) && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="space-y-4">
                      {section.elements.map(element => (
                        <div key={element.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium">{element.name}</h3>
                            <p className="text-sm text-gray-600">{element.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              Updated: {new Date(element.lastUpdated).toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              element.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {element.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}