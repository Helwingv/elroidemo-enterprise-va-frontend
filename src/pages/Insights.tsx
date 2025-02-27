import { useState } from 'react';
import { Users, Heart, Activity, Brain, Stethoscope, FileCheck2, AlertTriangle, ChevronUp, ChevronDown, Calendar, MapPin, Thermometer, Brush as Virus, Search, MessageSquare, MoreHorizontal } from 'lucide-react';

export default function Insights() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('WEEK');
  
  const countries = ['All', 'USA', 'China', 'Australia', 'UK', 'Botswana'];
  const timeFrames = ['DAY', 'WEEK', 'MONTH'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span className="font-medium text-gray-700">Dashboard</span>
        <span>›</span>
        <span className="font-medium text-gray-700">Insights</span>
      </div>

      {/* Main content container - two columns */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (wider) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Top Row - First 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* DIAGNOSTICS Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">DIAGNOSTICS</h3>
              <div className="flex justify-center mb-2">
                <div className="relative w-32 h-32">
                  {/* Circular chart representation */}
                  <div className="absolute inset-0 rounded-full border-[20px] border-blue-400" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[20px] border-red-400" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%, 50% 0)' }}></div>
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full">MALARIA</div>
                  <div className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">OTHERS</div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">187.2k</p>
                    <p className="text-xs text-gray-500">PATIENTS</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                  <span className="text-xs">MALARIA</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="text-xs">COLD</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  <span className="text-xs">TYPHOID</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-xs">OTHERS</span>
                </div>
              </div>
            </div>

            {/* PATIENTS Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">PATIENTS</h3>
              <div className="flex justify-center mb-2">
                <div className="relative w-32 h-32">
                  {/* Circular chart representation */}
                  <div className="absolute inset-0 rounded-full border-[20px] border-blue-500" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[20px] border-red-500" style={{ clipPath: 'polygon(0 0, 0 45%, 100% 45%, 100% 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[20px] border-orange-400" style={{ clipPath: 'polygon(0 45%, 0 58%, 100% 58%, 100% 45%)' }}></div>
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white text-xs font-bold px-4 py-1 rounded-full">MEN</div>
                  <div className="absolute right-0 top-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">WOMEN</div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">11M</p>
                    <p className="text-xs text-gray-500">PATIENTS</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                    <span className="text-xs">MEN</span>
                  </div>
                  <span className="text-xs">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-xs">WOMEN</span>
                  </div>
                  <span className="text-xs">43%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    <span className="text-xs">CHILDREN</span>
                  </div>
                  <span className="text-xs">12%</span>
                </div>
              </div>
            </div>

            {/* HEALTH INDEX Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">HEALTH INDEX</h3>
              <div className="flex items-center mb-2">
                <span className="text-4xl font-bold text-indigo-800">25%</span>
                <span className="ml-2 text-red-500 font-bold">↑</span>
              </div>
              <p className="text-xs text-gray-600 mb-4">Patient health rate</p>
              <div className="relative h-32 mt-2 bg-gradient-to-r from-indigo-900 to-blue-400 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  <div className="h-2/3 w-full bg-transparent"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-white border-2 border-red-500"></div>
                <div className="absolute bottom-0 w-full flex justify-between px-4 py-1 text-white text-xs">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Overview and Causes Range side by side */}
          <div className="grid grid-cols-12 gap-6">
            {/* Overview with Map and Zones - takes up 8/12 of the space */}
            <div className="col-span-8 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">OVERVIEW</h3>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* World Map */}
                <div className="relative w-full lg:w-2/3 h-64 bg-blue-50 rounded-lg">
                  {/* World Map with Dots */}
                  <div className="absolute inset-0 opacity-70">
                    <img 
                      src="https://talknexo.net/wp-content/uploads/2025/02/World-Map-Outline.jpg"
                      alt="World Map" 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  </div>
                  
                  {/* Dots overlay */}
                  {Array(15).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className={`absolute w-2 h-2 rounded-full ${
                        i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-blue-600' : 'bg-yellow-400'
                      }`}
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Zones Information */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-blue-800 mb-1">RECOVERY ZONES</h4>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">12M</span>
                      <div className="ml-2 w-16 h-1 bg-blue-800"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-yellow-500 mb-1">NEUTRAL ZONES</h4>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">5M</span>
                      <div className="ml-2 w-16 h-1 bg-yellow-500"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-red-500 mb-1">AFFECTED ZONES</h4>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">18M</span>
                      <div className="ml-2 w-16 h-1 bg-red-500"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-green-500 mb-1">SAFE ZONE</h4>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">2M</span>
                      <div className="ml-2 w-16 h-1 bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4 mt-4">
                <div className="text-sm text-gray-700">Select the countries</div>
                <div className="flex gap-2 overflow-x-auto">
                  {countries.map(country => (
                    <button 
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`text-xs ${selectedCountry === country ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Causes Range Chart - takes up 4/12 of the space */}
            <div className="col-span-4 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">CAUSES RANGE</h3>
              <div className="relative h-64 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Hexagonal/spider chart representation */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Outer hexagon */}
                      <polygon points="50,0 95,25 95,75 50,100 5,75 5,25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                      
                      {/* Inner hexagons */}
                      <polygon points="50,12.5 82.5,31.25 82.5,68.75 50,87.5 17.5,68.75 17.5,31.25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                      <polygon points="50,25 70,37.5 70,62.5 50,75 30,62.5 30,37.5" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                      <polygon points="50,37.5 57.5,43.75 57.5,56.25 50,62.5 42.5,56.25 42.5,43.75" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                      
                      {/* Data polygon */}
                      <polygon points="50,10 85,35 80,80 40,90 15,60 20,20" fill="rgba(173,216,230,0.3)" stroke="#70b5f9" strokeWidth="1.5" />
                      
                      {/* Dots at vertices */}
                      <circle cx="50" cy="10" r="3" fill="#1a56db" />
                      <circle cx="85" cy="35" r="3" fill="#f59e0b" />
                      <circle cx="80" cy="80" r="3" fill="#7c3aed" />
                      <circle cx="40" cy="90" r="3" fill="#ef4444" />
                      <circle cx="15" cy="60" r="3" fill="#14b8a6" />
                      <circle cx="20" cy="20" r="3" fill="#3b82f6" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                  <span className="text-xs">MALARIA</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-xs">SCIATICA</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                  <span className="text-xs">PTSD</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  <span className="text-xs">COUGH</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-xs">SEVERE HEADACHE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Network Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Health Network</h3>
            <div className="flex justify-between mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors by name or title"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex space-x-2">
                <button className="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-lg">ALL</button>
                <button className="px-6 py-2 border border-gray-200 text-sm font-medium rounded-lg">USA</button>
                <button className="px-6 py-2 border border-gray-200 text-sm font-medium rounded-lg">Other</button>
              </div>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Booked Appointments</th>
                  <th className="px-4 py-3">Chat</th>
                  <th className="px-4 py-3">Insights Connected</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Durham VA Health Center', location: 'Durham, NC, USA', appointments: 532, connected: true },
                  { name: 'Henry Ford Health', location: 'Detroit, MI, USA', appointments: 10304, connected: true },
                  { name: 'Manila Outpatient Clinic', location: 'Pasay City, Philippines', appointments: 35, connected: false }
                ].map((center, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <span className="font-medium">{center.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{center.location}</td>
                    <td className="px-4 py-3 text-sm text-red-500 font-medium">{center.appointments}</td>
                    <td className="px-4 py-3">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </td>
                    <td className="px-4 py-3">
                      {center.connected ? (
                        <span className="text-sm font-medium">Connected</span>
                      ) : (
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-4 flex justify-center">
              <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm">See More</button>
            </div>
          </div>
        </div>

        {/* Right Column - Narrower */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Overall Appointments Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xs font-semibold text-gray-700 mb-4">OVERALL APPOINTMENTS</h3>
            <div className="h-48 flex items-end justify-between space-x-1 mb-4">
              {['Jan', 'Feb', 'March', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                <div key={month} className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-blue-800 to-red-500 rounded-sm" style={{ height: `${50 + Math.random() * 50}px` }}></div>
                  <span className="mt-2 text-xs">{month}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                <span className="text-xs">EMERGENCY</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                <span className="text-xs">EXAMINATION</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                <span className="text-xs">CONSULTATION</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-xs">ROUTINE CHECKUP</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                <span className="text-xs">SICK VISIT</span>
              </div>
            </div>
          </div>

          {/* Leading Interventions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Leading Interventions</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=40&h=40&auto=format&fit=crop" 
                    alt="Housing" 
                    className="w-10 h-10 rounded-lg object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Housing Assistance</h4>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div className="h-full bg-green-300 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">30% Impact</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=40&h=40&auto=format&fit=crop" 
                    alt="Food" 
                    className="w-10 h-10 rounded-lg object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Food and Nutrition</h4>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div className="h-full bg-green-300 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">50% Impact</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=40&h=40&auto=format&fit=crop" 
                    alt="Training" 
                    className="w-10 h-10 rounded-lg object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Job and Training</h4>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div className="h-full bg-green-300 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">N/A</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm">See More</button>
            </div>
          </div>
          
          {/* Financial Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Financial</h3>
            <div className="flex mb-4">
              {timeFrames.map(frame => (
                <button 
                  key={frame}
                  onClick={() => setSelectedTimeFrame(frame)}
                  className={`flex-1 py-2 text-sm font-medium ${
                    selectedTimeFrame === frame 
                      ? 'text-white bg-red-500' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {[
                { doctor: 'Dr. Scott Tom', type: 'SICK VISIT', date: 'Friday, August 11' },
                { doctor: 'Dr. Amina Ahmad', type: 'Consultation', date: 'Tuesday, July 30' },
                { doctor: 'Dr. Ibrahim Yekeni', type: 'Examination', date: 'Wednesday, July 17' },
                { doctor: 'Dr. Barnabas Paul', type: 'Emergency', date: 'Monday, June 14' }
              ].map((appt, idx) => (
                <div key={idx} className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{appt.doctor}</p>
                      <p className={`text-xs ${
                        appt.type === 'Emergency' 
                          ? 'text-red-500' 
                          : appt.type === 'SICK VISIT' 
                            ? 'text-blue-500' 
                            : appt.type === 'Consultation' 
                              ? 'text-purple-500' 
                              : 'text-orange-500'
                      }`}>
                        {appt.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{appt.date}</span>
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}