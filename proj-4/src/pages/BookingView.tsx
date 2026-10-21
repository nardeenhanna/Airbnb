import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';

interface BookingsViewProps {
  bookings: any[];
}

export const BookingsView: React.FC<BookingsViewProps> = ({ bookings }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

const getStatusBadge = (status: string) => {
      switch (status) {
      case 'upcoming':
        return <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">قادم</span>;
      case 'completed':
        return <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">مكتمل</span>;
      case 'cancelled':
        return <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full font-medium">ملغى</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs Filter */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition ${
            filter === 'upcoming' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          القادمة
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition ${
            filter === 'completed' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          السابقة
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-sm">لا توجد حجوزات ضمن هذا التصنيف.</p>
          </div>
        ) : (
          filteredBookings.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <img
                  src={b.property.imageUrl}
                  alt={b.property.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{b.property.title}</h4>
                    {getStatusBadge(b.status)}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {b.property.location}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                    <CalendarIcon size={12} />
                    <span>{b.checkIn}</span> إلی <span>{b.checkOut}</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <span className="text-xs text-gray-400">الإجمالي</span>
                <span className="text-base font-bold text-indigo-600">${b.totalPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default BookingsView;