import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostDashboard() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('today');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      {/* Top Header Section */}
      <div className="border-b px-8 py-4 flex items-center justify-between">
        <div className="flex gap-8 text-sm font-semibold text-gray-700">
          <span className="border-b-2 border-black pb-1 cursor-pointer">Today</span>
          <span className="hover:text-black cursor-pointer">Calendar</span>
          <span className="hover:text-black cursor-pointer">Listings</span>
          <span className="hover:text-black cursor-pointer">Messages</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
        
        {/* Toggle Pills (Today / Upcoming) */}
        <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 mb-12">
          <button
            onClick={() => setActiveSubTab('today')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeSubTab === 'today' ? 'bg-[#333333] text-white shadow-sm' : 'text-gray-700 hover:text-black'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveSubTab('upcoming')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
              activeSubTab === 'upcoming' ? 'bg-[#333333] text-white shadow-sm' : 'text-gray-700 hover:text-black'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Book Icon */}
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
            alt="Reservations Book"
            className="w-24 h-24 mx-auto object-contain opacity-80"
          />
        </div>

        {/* Text Details */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          You don’t have any reservations
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
          To get booked, you’ll need to complete and publish your listing.
        </p>

        {/* 🟢 الزر المطلوب (Complete your listing) */}
        <button
          onClick={() => navigate('/create-listing')}
          className="bg-[#222222] hover:bg-black text-white font-semibold px-6 py-3.5 rounded-xl transition duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg"
        >
          Complete your listing
        </button>

      </div>
    </div>
  );
}