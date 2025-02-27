import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  LayoutGrid,
  Bell,
  Users,
  GitMerge,
  FileCheck2,
  Building2,
  ClipboardList,
  ScrollText,
  Settings,
} from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutGrid },
    { name: 'Alerts & Notifications', href: '/alerts', icon: Bell },
    { name: 'Patient Profiles', href: '/patients', icon: Users },
    { name: 'Data Mapping & Integration', href: '/data-mapping', icon: GitMerge },
    { name: 'Consent Management', href: '/consent', icon: FileCheck2 },
    { name: 'Providers & Care Teams', href: '/providers', icon: Building2 },
    { name: 'Benefits & Services', href: '/benefits', icon: ClipboardList },
    { name: 'Compliance & Audit Logs', href: '/compliance', icon: ScrollText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden ${
        isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none -z-10'
      }`} onClick={toggleSidebar} />
      <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <img src="/elroi-logo.svg" alt="Elroi Health" className="h-8" />
          <span className="text-2xl font-medium text-blue-600">Health</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-5 text-sm font-medium rounded-lg ${
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 2.81828e-06 10 2.81828e-06C11.5527 -0.00116364 13.0842 0.359775 14.4729 1.05414C15.8617 1.74851 17.0693 2.75718 18 4H15.29C14.1352 2.98176 12.7112 2.31836 11.1887 2.0894C9.66625 1.86044 8.11007 2.07566 6.70689 2.70921C5.30371 3.34277 4.11315 4.36776 3.27807 5.66119C2.44299 6.95461 1.99887 8.46153 1.999 10.0011C1.99913 11.5407 2.4435 13.0475 3.27879 14.3408C4.11409 15.6341 5.30482 16.6589 6.7081 17.2922C8.11139 17.9255 9.66761 18.1405 11.19 17.9113C12.7125 17.6821 14.1364 17.0184 15.291 16H18.001C17.0702 17.243 15.8624 18.2517 14.4735 18.9461C13.0846 19.6405 11.5528 20.0013 10 20ZM17 14V11H9V9H17V6L22 10L17 14Z" fill="currentColor"/>
            </svg>
            <span className="text-sm font-medium">LOGOUT</span>
          </button>
        </div>
      </div>
    </>
  );
}