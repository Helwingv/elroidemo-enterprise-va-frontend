export default function HealthRecords() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Health Records Overview</span>
        <span>›</span>
        <span>Patient Profile: ID: VA-2025-789</span>
      </div>

      <h1 className="text-4xl font-bold mb-8">Health Records</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          {/* Patient Profile */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Patient Profile</h2>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-700">View All</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Export Records
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces"
                alt="Patient profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">ID P12345</p>
                <p className="text-gray-600">ID: VA-2025-789 • DOB: 05/15/1975</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Blood Type</h4>
                <p className="text-lg font-semibold">A+</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Height</h4>
                <p className="text-lg font-semibold">5'10"</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Weight</h4>
                <p className="text-lg font-semibold">175 lbs</p>
              </div>
            </div>
          </div>

          {/* Health Status and Data Sharing */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Health Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Check-up</span>
                  <span className="font-medium">Jan 15, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Benefits Status</span>
                  <span className="font-medium">Enrolled</span>
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Data Sharing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">External Access</span>
                  <span className="font-medium text-green-600">Authorized</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Medical History</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Type 2 Diabetes</h3>
                <p className="text-gray-600">Diagnosed: 2020</p>
                <p className="text-gray-600">Managed with oral medications and lifestyle modifications</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Hypertension</h3>
                <p className="text-gray-600">Diagnosed: 2018</p>
                <p className="text-gray-600">Controlled with medication</p>
              </div>
            </div>
          </div>

          {/* Current Medications & Treatments */}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Current Medications & Treatments</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Medication</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Metformin</span>
                  <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                    Reminder
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hypertension</span>
                  <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                    Reminder
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Treatment</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Nutrition Counseling</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    View program online
                  </button>
                </div>
                <p className="text-gray-600">Frequency: Biweekly • 5 sessions total</p>
                <p className="text-gray-600">Next Session: April 5, 2026 @ 2:00 PM</p>
                <p className="text-gray-600">Start Date: April 5, 2026</p>
                <p className="text-gray-600">End Date: June 30, 2027</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Recent Test Results */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Recent Test Results</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Blood Glucose</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Normal
                    </span>
                    <span className="text-sm text-gray-500">01/15/2025</span>
                  </div>
                </div>
                <div className="relative h-24 bg-orange-50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    {/* Graph would go here */}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <p className="text-sm text-gray-600">Latest: 142 mg/dL</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Blood Pressure</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Normal
                    </span>
                    <span className="text-sm text-gray-500">01/15/2025</span>
                  </div>
                </div>
                <div className="relative h-24 bg-blue-50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    {/* Graph would go here */}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <p className="text-sm text-gray-600">Latest: 128/82 mmHg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Upcoming Appointments</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Primary Care Follow-up</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>February 1, 2025 at 10:00 AM</p>
                  <p>Dr. Sarah Wilson</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Endocrinology Consult</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>February 15, 2025 at 2:30 PM</p>
                  <p>Dr. Michael Chen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}