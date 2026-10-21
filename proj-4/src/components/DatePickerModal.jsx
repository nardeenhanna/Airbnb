import React, { useState } from 'react';

export default function DatePickerModal({ isOpen, onClose, onSelectDates }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  if (!isOpen) return null;

  const handleDateClick = (dayNumber, monthName, year) => {
    const selectedDate = `${monthName} ${dayNumber}, ${year}`;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(selectedDate);
      setCheckOut(null);
      if (onSelectDates) onSelectDates({ checkIn: selectedDate, checkOut: null });
    } else {
      setCheckOut(selectedDate);
      if (onSelectDates) onSelectDates({ checkIn, checkOut: selectedDate });
    }
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-xl w-full z-50">
      {/* زر إغلاق التقويم */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-gray-500 uppercase">Select Dates</span>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-700 text-sm font-bold p-1 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {/* أزرار Dates / Flexible */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1">
          <button className="px-5 py-1.5 rounded-full bg-white font-semibold text-xs shadow-xs text-gray-900 cursor-pointer">
            Dates
          </button>
          <button className="px-5 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer">
            Flexible
          </button>
        </div>
      </div>

      {/* تقويم الشهريين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* شهر أكتوبر 2026 */}
        <div>
          <h4 className="text-center font-bold text-sm mb-3 text-gray-900">October 2026</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const dateStr = `October ${day}, 2026`;
              const isStart = checkIn === dateStr;
              const isEnd = checkOut === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day, 'October', 2026)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-medium transition cursor-pointer mx-auto
                    ${isStart || isEnd ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-800'}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* شهر نوفمبر 2026 */}
        <div>
          <h4 className="text-center font-bold text-sm mb-3 text-gray-900">November 2026</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const dateStr = `November ${day}, 2026`;
              const isStart = checkIn === dateStr;
              const isEnd = checkOut === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day, 'November', 2026)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-medium transition cursor-pointer mx-auto
                    ${isStart || isEnd ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-800'}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* النتيجة بالأسفل Check-in & Checkout */}
      <div className="flex gap-4 border-t pt-4">
        <div className="flex-1 border border-gray-200 rounded-2xl p-3 flex flex-col justify-center bg-gray-50/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Check-in</span>
          <span className="text-xs font-semibold text-gray-900 mt-0.5">
            {checkIn || "Exact date"}
          </span>
        </div>

        <div className="flex-1 border border-gray-200 rounded-2xl p-3 flex flex-col justify-center bg-gray-50/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Checkout</span>
          <span className="text-xs font-semibold text-gray-900 mt-0.5">
            {checkOut || "Exact date"}
          </span>
        </div>
      </div>
    </div>
  );
}