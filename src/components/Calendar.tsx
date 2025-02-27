import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const generateDays = () => {
    const days = [];
    const previousMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Previous month days
    for (let i = previousMonthDays; i > 0; i--) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -i + 1);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {generateDays().map(({ date, isCurrentMonth }, index) => (
          <button
            key={index}
            onClick={() => onDateSelect(date)}
            className={`
              p-2 rounded-lg text-center
              ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
              ${isSelected(date) ? 'bg-blue-600 text-white' : ''}
              ${isToday(date) && !isSelected(date) ? 'bg-blue-100 text-blue-600' : ''}
              ${!isSelected(date) ? 'hover:bg-gray-100' : ''}
            `}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}