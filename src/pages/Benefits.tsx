import { useState } from 'react';
import { FileText, Clock, AlertTriangle, CheckCircle2, ArrowUpRight, Download } from 'lucide-react';
import ServiceDetailModal from '../components/ServiceDetailModal';
import ApplyBenefitsModal from '../components/ApplyBenefitsModal';
import ScheduleServiceModal from '../components/ScheduleServiceModal';

interface Benefit {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Under Review';
  type: string;
  lastUpdated: string;
  nextReview: string;
  documents: string[];
}

interface Service {
  id: string;
  name: string;
  provider: string;
  status: 'Available' | 'Scheduled' | 'Completed' | 'Cancelled';
  date: string;
  location: string;
  description?: string;
  eligibility?: string[];
  requirements?: string[];
  coverage?: string[];
}

const benefits: Benefit[] = [
  {
    id: 'B1',
    name: 'Healthcare Benefits',
    status: 'Active',
    type: 'Medical',
    lastUpdated: '2024-02-15',
    nextReview: '2025-02-15',
    documents: ['Enrollment Form', 'Medical History', 'Service Records']
  },
  {
    id: 'B2',
    name: 'Education Benefits (GI Bill)',
    status: 'Under Review',
    type: 'Education',
    lastUpdated: '2024-01-20',
    nextReview: '2024-03-01',
    documents: ['Application Form', 'School Records']
  },
  {
    id: 'B3',
    name: 'Disability Compensation',
    status: 'Active',
    type: 'Compensation',
    lastUpdated: '2024-02-01',
    nextReview: '2025-02-01',
    documents: ['Medical Assessment', 'Service Records']
  },
  {
    id: 'B4',
    name: 'Housing Loan Benefits',
    status: 'Pending',
    type: 'Housing',
    lastUpdated: '2024-02-10',
    nextReview: '2024-03-15',
    documents: ['Loan Application', 'Financial Records']
  }
];

const services: Service[] = [
  {
    id: 'S1',
    name: 'Mental Health Counseling',
    provider: 'VA Medical Center',
    status: 'Scheduled',
    date: '2024-03-01',
    location: 'Building A, Room 205'
  },
  {
    id: 'S2',
    name: 'Physical Therapy',
    provider: 'Veterans Rehabilitation Center',
    status: 'Completed',
    date: '2024-02-15',
    location: 'Physical Therapy Wing'
  },
  {
    id: 'S3',
    name: 'Career Counseling',
    provider: 'Veterans Employment Center',
    status: 'Available',
    date: 'Flexible',
    location: 'Online'
  },
  {
    id: 'S4',
    name: 'Housing Assistance',
    provider: 'VA Housing Department',
    status: 'Scheduled',
    date: '2024-03-10',
    location: 'Administrative Building'
  }
];

export default function Benefits() {
  const [activeTab, setActiveTab] = useState<'benefits' | 'services'>('benefits');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isServiceDetailModalOpen, setIsServiceDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleApplyBenefits = (data: {
    benefitType: string;
    serviceHistory: string;
    documents: string[];
    preferredContact: string;
    additionalInfo: string;
  }) => {
    // Handle the benefits application
    console.log('Benefits application:', data);
  };

  const handleViewServiceDetails = (service: Service) => {
    setSelectedService({
      ...service,
      description: 'Comprehensive service providing specialized care and support for veterans.',
      eligibility: [
        'Honorably discharged veterans',
        'Active duty service members',
        'Qualifying family members'
      ],
      requirements: [
        'Valid military ID or DD-214',
        'Medical records',
        'Insurance information'
      ],
      coverage: [
        'Full medical consultation',
        'Diagnostic testing',
        'Follow-up care',
        'Prescription medications'
      ]
    });
    setIsServiceDetailModalOpen(true);
  };

  const handleScheduleService = (data: {
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    location: string;
    specialRequirements: string;
    documents: string[];
  }) => {
    // Handle the service scheduling
    console.log('Service scheduling:', data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Benefits & Services</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Benefits & Services</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsApplyModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Apply for Benefits
          </button>
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Schedule Service
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Active Benefits</h3>
          </div>
          <p className="text-3xl font-bold">2</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold">1</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Available Services</h3>
          </div>
          <p className="text-3xl font-bold">4</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Expiring Soon</h3>
          </div>
          <p className="text-3xl font-bold">1</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'benefits'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('benefits')}
          >
            Benefits Overview
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'services'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('services')}
          >
            Available Services
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'benefits' ? (
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{benefit.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          benefit.status === 'Active' ? 'bg-green-100 text-green-800' :
                          benefit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          benefit.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {benefit.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">Type: {benefit.type}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Last Updated</p>
                          <p className="font-medium">{benefit.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Review</p>
                          <p className="font-medium">{benefit.nextReview}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Download className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <ArrowUpRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium mb-2">Required Documents</h4>
                    <div className="flex gap-2">
                      {benefit.documents.map((doc, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white text-sm text-gray-600 rounded-lg border border-gray-200"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          service.status === 'Available' ? 'bg-green-100 text-green-800' :
                          service.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          service.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">Provider: {service.provider}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Date</p>
                          <p className="font-medium">{service.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium">{service.location}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleViewServiceDetails(service)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {service.status === 'Available' ? 'Schedule' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
          )}
        </div>
      </div>
      {selectedService && (
        <ServiceDetailModal
          isOpen={isServiceDetailModalOpen}
          onClose={() => setIsServiceDetailModalOpen(false)}
          service={selectedService}
        />
      )}
      <ApplyBenefitsModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplyBenefits}
      />
      <ScheduleServiceModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleService}
      />
    </div>
  );
}