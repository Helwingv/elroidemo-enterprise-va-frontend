import { X, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (appointment: {
    date: string;
    time: string;
    type: string;
    provider: string;
  }) => void;
}

const appointmentTypes = [
  'Annual Check-up',
  'Follow-up Visit',
  'Blood Pressure Check',
  'Lab Work',
  'Vaccination',
  'Consultation'
];

const providers = [
  'Dr. Johnson - Primary Care',
  'Dr. Smith - Cardiology',
  'Dr. Chen - Internal Medicine',
  'Dr. Patel - Family Medicine'
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      slots.push(time);
    }
  }
  return slots;
};

export default function AppointmentBookingModal({ isOpen, onClose, onBook }: AppointmentBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const timeSlots = generateTimeSlots();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onBook({
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      type: formData.get('type') as string,
      provider: formData.get('provider') as string
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
          <div>
            <h2 className="text-xl font-semibold">Book an Appointment</h2>
            <p className="text-sm text-gray-600">Schedule your next visit</p>
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
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select appointment type</option>
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                Healthcare Provider
              </label>
              <select
                id="provider"
                name="provider"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select provider</option>
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Preferred Time
              </label>
              <select
                id="time"
                name="time"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select time slot</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Important Information:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring your insurance card and ID</li>
                <li>• Wear a mask during your visit</li>
                <li>• Cancel or reschedule at least 24 hours in advance</li>
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
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}