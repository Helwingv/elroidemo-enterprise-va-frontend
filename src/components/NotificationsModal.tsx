import { X, MessageSquare, Calendar, Trophy, AlertCircle, BellRing, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'critical' | 'success' | 'monitoring';
  icon: 'message' | 'calendar' | 'trophy' | 'alert';
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Data Integrity Issue',
    title: 'New Message',
    message: 'Inconsistent data detected in patient records synchronization',
    time: '5 minutes ago',
    read: false,
    type: 'critical',
    icon: 'message'
  },
  {
    id: '2',
    title: 'Appointment Reminder',
    message: 'New data sharing agreement successfully processed',
    time: '1 hour ago',
    read: true,
    type: 'success',
    icon: 'trophy'
  },
  {
    id: '3',
    title: 'PTSD Assessment Trend',
    title: 'Health Goal Achieved',
    message: 'Increased PTSD reports in Western Region',
    time: '2 hours ago',
    read: true,
    type: 'monitoring',
    icon: 'alert'
  }
];

const getNotificationIcon = (icon: string) => {
  switch (icon) {
    case 'message':
      return <MessageSquare className="h-5 w-5 text-blue-600" />;
    case 'calendar':
      return <Calendar className="h-5 w-5 text-yellow-600" />;
    case 'trophy':
      return <Trophy className="h-5 w-5 text-green-600" />;
    case 'alert':
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    default:
      return <BellRing className="h-5 w-5 text-gray-600" />;
  }
};

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50';
      case 'success':
        return 'bg-green-50';
      case 'monitoring':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        onClick={onClose}
      />
      <div className="fixed right-4 top-16 w-96 bg-white rounded-xl shadow-xl z-50 max-h-[calc(100vh-5rem)] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${getNotificationStyle(notification.type)} transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notification.icon)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{notification.title}</h3>
                        {!notification.read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => {
              onClose();
              navigate('/alerts');
            }}
            className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <CheckCircle className="h-4 w-4" />
            View All
          </button>
        </div>
      </div>
    </>
  );
}