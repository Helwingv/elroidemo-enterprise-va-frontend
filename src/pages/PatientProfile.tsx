import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Activity, 
  Heart, 
  Download, 
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  status: 'Active' | 'Inactive' | 'Pending';
  provider: string;
  image: string;
  bloodType: string;
  height: string;
  weight: string;
  conditions: Array<{
    name: string;
    status: string;
    diagnosedDate: string;
    notes: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }>;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: string;
    oxygenLevel: number;
  };
  appointments: Array<{
    date: string;
    time: string;
    type: string;
    provider: string;
    location: string;
  }>;
}

// Mock patient data
const patientData: Patient = {
  id: 'VA-2025-789',
  name: 'John Doe',
  dateOfBirth: '1975-05-15',
  status: 'Active',
  provider: 'Dr. Sarah Johnson',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&fit=crop&crop=faces',
  bloodType: 'A+',
  height: "5'10\"",
  weight: '175 lbs',
  conditions: [
    {
      name: 'Type 2 Diabetes',
      status: 'Managed',
      diagnosedDate: '2020-03-15',
      notes: 'Controlled with medication and diet'
    },
    {
      name: 'Hypertension',
      status: 'Active',
      diagnosedDate: '2019-08-22',
      notes: 'Regular monitoring required'
    }
  ],
  medications: [
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2020-03-20'
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2019-09-01'
    }
  ],
  vitals: {
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: '98.6°F',
    oxygenLevel: 98
  },
  appointments: [
    {
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Follow-up',
      provider: 'Dr. Sarah Johnson',
      location: 'VA Medical Center'
    },
    {
      date: '2024-04-01',
      time: '2:30 PM',
      type: 'Lab Work',
      provider: 'VA Lab Services',
      location: 'VA Medical Center'
    }
  ]
};

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'medications'>('overview');

  // In a real application, you would fetch patient data based on the ID
  const patient = patientData;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button 
          onClick={() => navigate('/patients')}
          className="flex items-center gap-1 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </button>
        <span>›</span>
        <span>Patient Profile</span>
        <span>›</span>
        <span>{patient.id}</span>
      </div>

      {/* Patient Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Veteran Profile</h2>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 hover:text-blue-700">View All</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export Records
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <p className="text-gray-600">ID P12345</p>
              <p className="text-gray-600">ID: {patient.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                  patient.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">DOB: {patient.dateOfBirth}</span>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Blood Type</div>
            <div className="text-xl font-semibold">{patient.bloodType}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Height</div>
            <div className="text-xl font-semibold">{patient.height}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Weight</div>
            <div className="text-xl font-semibold">{patient.weight}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Primary Provider</div>
            <div className="text-xl font-semibold">{patient.provider}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'history'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Medical History
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'medications'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('medications')}
          >
            Medications
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6">
              {/* Vitals */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Current Vitals</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Blood Pressure</div>
                        <div className="text-xl font-semibold">{patient.vitals.bloodPressure}</div>
                      </div>
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Heart Rate</div>
                        <div className="text-xl font-semibold">{patient.vitals.heartRate} bpm</div>
                      </div>
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
                <div className="space-y-4">
                  {patient.appointments.map((appointment, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{appointment.type}</div>
                          <div className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.provider} • {appointment.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Medical Conditions</h2>
              {patient.conditions.map((condition, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{condition.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      condition.status === 'Managed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {condition.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosedDate}</p>
                  <p className="text-sm text-gray-600 mt-2">{condition.notes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Current Medications</h2>
              {patient.medications.map((medication, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{medication.name}</h3>
                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                      Refill
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block">Dosage</span>
                      <span className="font-medium">{medication.dosage}</span>
                    </div>
                    <div>
                      <span className="block">Frequency</span>
                      <span className="font-medium">{medication.frequency}</span>
                    </div>
                    <div>
                      <span className="block">Started</span>
                      <span className="font-medium">{medication.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}