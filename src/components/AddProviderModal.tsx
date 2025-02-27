import { X } from 'lucide-react';

interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (provider: {
    name: string;
    category: string;
    dataTypes: string[];
  }) => void;
}

const categories = [
  'Healthcare',
  'Hospital',
  'Clinic',
  'Pharmacy',
  'Fitness',
  'Research',
  'Insurance'
];

const dataTypes = [
  'Medical Records',
  'Lab Results',
  'Prescriptions',
  'Insurance Claims',
  'Vital Signs',
  'Fitness Metrics',
  'Nutrition Data',
  'Mental Health Records',
  'Vaccination History'
];

export default function AddProviderModal({ isOpen, onClose, onAdd }: AddProviderModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const selectedDataTypes = dataTypes.filter(type => 
      formData.get(`dataType-${type}`) === 'on'
    );

    onAdd({
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      dataTypes: selectedDataTypes
    });
    
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add New Provider</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Provider Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter provider name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Types
              </label>
              <div className="space-y-2">
                {dataTypes.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`dataType-${type}`}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Provider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}