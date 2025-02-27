import { X, FileText, Calendar, AlertTriangle } from 'lucide-react';

interface ApplyBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    benefitType: string;
    serviceHistory: string;
    documents: string[];
    preferredContact: string;
    additionalInfo: string;
  }) => void;
}

const benefitTypes = [
  'Healthcare Benefits',
  'Education Benefits (GI Bill)',
  'Disability Compensation',
  'Housing Loan Benefits',
  'Life Insurance',
  'Vocational Rehabilitation',
  'Pension'
];

const requiredDocuments = [
  'DD-214 (Certificate of Release)',
  'Military Service Records',
  'Medical Documentation',
  'Proof of Income',
  'Disability Documentation',
  'Marriage/Dependent Records'
];

const contactMethods = [
  'Email',
  'Phone',
  'Mail',
  'VA Portal Message'
];

export default function ApplyBenefitsModal({ isOpen, onClose, onSubmit }: ApplyBenefitsModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const selectedDocuments = requiredDocuments.filter(doc => 
      formData.get(`document-${doc}`) === 'on'
    );

    onSubmit({
      benefitType: formData.get('benefitType') as string,
      serviceHistory: formData.get('serviceHistory') as string,
      documents: selectedDocuments,
      preferredContact: formData.get('preferredContact') as string,
      additionalInfo: formData.get('additionalInfo') as string
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
      <div className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">Apply for Benefits</h2>
            <p className="text-sm text-gray-600">Complete the form to submit your benefits application</p>
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
              <label htmlFor="benefitType" className="block text-sm font-medium text-gray-700 mb-2">
                Benefit Type
              </label>
              <select
                id="benefitType"
                name="benefitType"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select benefit type</option>
                {benefitTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="serviceHistory" className="block text-sm font-medium text-gray-700 mb-2">
                Service History
              </label>
              <textarea
                id="serviceHistory"
                name="serviceHistory"
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide details about your military service..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Documents
              </label>
              <div className="space-y-2">
                {requiredDocuments.map(doc => (
                  <label key={doc} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`document-${doc}`}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select contact method</option>
                {contactMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information to support your application..."
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• Ensure all provided information is accurate and complete</li>
                    <li>• Processing time may vary based on benefit type</li>
                    <li>• Additional documentation may be requested</li>
                    <li>• False statements may result in benefit denial</li>
                  </ul>
                </div>
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
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
}