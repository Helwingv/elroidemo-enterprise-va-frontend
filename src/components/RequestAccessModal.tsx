import { X, FileText, Shield } from 'lucide-react';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    purpose: string;
    dataTypes: string[];
    duration: string;
    additionalNotes: string;
  }) => void;
}

const dataTypes = [
  'Medical History',
  'Lab Results',
  'Prescriptions',
  'Treatment Plans',
  'Insurance Information',
  'Mental Health Records'
];

const durations = [
  '1 month',
  '3 months',
  '6 months',
  '1 year'
];

export default function RequestAccessModal({ isOpen, onClose, onSubmit }: RequestAccessModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const selectedDataTypes = dataTypes.filter(type => 
      formData.get(`dataType-${type}`) === 'on'
    );

    onSubmit({
      purpose: formData.get('purpose') as string,
      dataTypes: selectedDataTypes,
      duration: formData.get('duration') as string,
      additionalNotes: formData.get('additionalNotes') as string
    });
    
    form.reset();
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
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Request Data Access</h2>
              <p className="text-sm text-gray-600">Submit a request to access veteran data</p>
            </div>
          </div>
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
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Access
              </label>
              <textarea
                id="purpose"
                name="purpose"
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explain why you need access to this data..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Types Requested
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

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Access Duration
              </label>
              <select
                id="duration"
                name="duration"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select duration</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Important Information:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• All access requests are subject to review</li>
                <li>• Access is granted based on need-to-know basis</li>
                <li>• You must comply with all data privacy regulations</li>
                <li>• Access can be revoked at any time</li>
              </ul>
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
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
}