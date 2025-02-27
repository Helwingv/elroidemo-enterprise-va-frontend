import { X, Calendar, Clock, MapPin, FileText, AlertTriangle } from 'lucide-react';

interface ScheduleServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    location: string;
    specialRequirements: string;
    documents: string[];
  }) => void;
}

const serviceTypes = [
  'Mental Health Counseling',
  'Physical Therapy',
  'Career Counseling',
  'Housing Assistance',
  'Medical Check-up',
  'Dental Services',
  'Vision Care'
];

const locations = [
  'VA Medical Center - Building A',
  'VA Medical Center - Building B',
  'Veterans Rehabilitation Center',
  'Veterans Employment Center',
  'VA Housing Department'
];

const requiredDocuments = [
  'VA ID Card',
  'Medical Records',
  'Insurance Information',
  'Referral Documentation',
  'Previous Treatment Records'
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      slots.push(time);
    }
  }
  return slots;
};

export default function ScheduleServiceModal({ isOpen, onClose, onSubmit }: ScheduleServiceModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const selectedDocuments = requiredDocuments.filter(doc => 
      formData.get(`document-${doc}`) === 'on'
    );

    onSubmit({
      serviceType: formData.get('serviceType') as string,
      preferredDate: formData.get('preferredDate') as string,
      preferredTime: formData.get('preferredTime') as string,
      location: formData.get('location') as string,
      specialRequirements: formData.get('specialRequirements') as string,
      documents: selectedDocuments
    });
    
    form.reset();
    onClose();
  };

  const timeSlots = generateTimeSlots();

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">Schedule a Service</h2>
            <p className="text-sm text-gray-600">Book your appointment with VA services</p>
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
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select service type</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline-block w-4 h-4 mr-1" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                Location
              </label>
              <select
                id="location"
                name="location"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline-block w-4 h-4 mr-1" />
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
              <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements or Notes
              </label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or additional information..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li>• Please arrive 15 minutes before your appointment</li>
                    <li>• Bring all required documents</li>
                    <li>• Wear a mask during your visit</li>
                    <li>• Cancel or reschedule at least 24 hours in advance</li>
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
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}