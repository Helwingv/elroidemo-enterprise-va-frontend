import { Search, Bell, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../hooks/useSidebar';
import { useState } from 'react';
import NotificationsModal from './NotificationsModal';

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 relative z-20">
      <div className="flex items-center justify-between px-6 py-3">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center flex-1 max-w-2xl">
          <div className="w-full">
            <div className="relative font-thin text-xs">
              <input
                type="text"
                placeholder="Search items, collections, and users"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Home className="h-6 w-6 text-gray-600" />
          </button>
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <img
              src="https://ui-avatars.com/api/?name=Rachel+Cash"
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-gray-200"
            />
          </button>
        </div>
      </div>
      <NotificationsModal 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
}