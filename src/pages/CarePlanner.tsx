import { useState } from 'react';
import Calendar from '../components/Calendar';
import { CheckCircle } from 'lucide-react';

interface Appointment {
  id: string;
  provider: {
    name: string;
    logo: string;
  };
  date: string;
}

interface ReminderSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const appointments: Appointment[] = [
  {
    id: '1',
    provider: {
      name: 'Baptist Health',
      logo: '/baptist-health-logo.svg'
    },
    date: '02/20/2026'
  },
  {
    id: '2',
    provider: {
      name: 'HealthMart Pharmacy',
      logo: '/healthmart-logo.svg'
    },
    date: '02/20/2026'
  },
  {
    id: '3',
    provider: {
      name: 'Health Zone',
      logo: '/health-zone-logo.svg'
    },
    date: '02/24/2026'
  }
];

const reminderSettings: ReminderSetting[] = [
  {
    id: 'email',
    title: 'Email Notifications',
    description: 'Get appointment details in your inbox',
    enabled: true
  },
  {
    id: 'sms',
    title: 'Text Message Alerts',
    description: 'Receive quick SMS reminders',
    enabled: true
  },
  {
    id: 'app',
    title: 'In-App Notifications',
    description: 'See reminders inside your dashboard',
    enabled: true
  }
];

export default function CarePlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderToggles, setReminderToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(reminderSettings.map(setting => [setting.id, setting.enabled]))
  );

  const toggleReminder = (id: string) => {
    setReminderToggles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Care Planner</span>
      </div>

      <h1 className="text-4xl font-bold mb-8">Care Planner</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="col-span-12 lg:col-span-7">
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

          <div className="mt-6 bg-white rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-gray-600">Date:</div>
                  <div className="font-medium">Tuesday, February 24, 2026</div>
                </div>
                <div>
                  <div className="text-gray-600">Time:</div>
                  <div className="font-medium">10:30 AM (Local Time)</div>
                </div>
              </div>

              <div>
                <div className="text-gray-600">Provider:</div>
                <div className="font-medium">Dr. Emily Carter, Primary Care</div>
              </div>

              <div>
                <div className="text-gray-600">Location:</div>
                <div className="font-medium">VA Medical Center</div>
                <div className="text-gray-600">Chicago, IL</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-gray-600">Appointment Status:</div>
                <div className="flex items-center gap-1 text-green-600">
                  <span>Confirmed</span>
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Appointments Section */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <h3 className="text-gray-600 mb-4">This Month</h3>
            
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-2">Providers</th>
                  <th className="pb-2">Appointment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={appointment.provider.logo}
                          alt={appointment.provider.name}
                          className="w-8 h-8"
                        />
                        <span className="font-medium">{appointment.provider.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{appointment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reminder Settings */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Reminder Settings</h2>
            <div className="space-y-4">
              {reminderSettings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => toggleReminder(setting.id)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      reminderToggles[setting.id] ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all ${
                        reminderToggles[setting.id] ? 'left-[1.625rem]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}