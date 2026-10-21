import React, { useState } from 'react';
import { MessageSquare, Menu } from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 dir-ltr" dir="ltr">
      {/* 1. Header Navbar */}
      <header className="border-b border-gray-200 px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Airbnb Logo */}
        <div className="flex items-center gap-1 text-[#FF385C] font-bold text-2xl tracking-tighter cursor-pointer">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8-8 8-2.302 0-4.512-1.022-6.035-2.76L16 28.878l-.465.556C14.012 31.178 11.802 32 9.5 32c-4.4 0-8-3.592-8-8 0-.962.247-1.884.922-3.511l.194-.436c1.023-2.35 5.183-11.06 7.137-14.89l.533-1.025C11.537 1.963 12.992 1 15 1zm0 2c-1.242 0-2.287.636-3.411 2.651l-.479.921c-1.92 3.765-6.027 12.368-6.992 14.63l-.16.376c-.579 1.382-.758 2.083-.798 2.766L4.15 24c0 3.314 2.686 6 6 6 1.79 0 3.52-.821 4.721-2.228l.829-.972.829.972C17.78 29.179 19.51 30 21.3 30c3.314 0 6-2.686 6-6 0-.726-.188-1.482-.808-2.962l-.15-.348c-.965-2.262-5.072-10.865-6.992-14.63l-.479-.921C17.747 3.636 16.702 3 15 3z" />
          </svg>
          <span className="text-xl font-bold font-sans tracking-normal">airbnb</span>
        </div>

        {/* Right Header Navigation */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition">
            Become a host
          </button>
          
          {/* User Profile Green Circle */}
          <div className="w-10 h-10 rounded-full bg-[#DDEDE2] text-[#004D40] flex items-center justify-center font-semibold text-sm">
            M
          </div>

          {/* Hamburger Menu Button */}
          <button className="p-2.5 border border-gray-300 rounded-full hover:shadow-md transition">
            <Menu size={18} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Sidebar */}
          <div className="md:col-span-4 pr-0 md:pr-6 border-r-0 md:border-r border-gray-200">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>

            <nav className="space-y-1">
              {/* About me Tab */}
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left font-medium transition ${
                  activeTab === 'about'
                    ? 'bg-[#F0F0F0] text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#DDEDE2] text-[#004D40] flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <span>About me</span>
              </button>

              {/* Past trips Tab */}
              <button
                onClick={() => setActiveTab('trips')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left font-medium transition ${
                  activeTab === 'trips'
                    ? 'bg-[#F0F0F0] text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl w-8 text-center shrink-0">🧳</span>
                <span>Past trips</span>
              </button>

              {/* Connections Tab */}
              <button
                onClick={() => setActiveTab('connections')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left font-medium transition ${
                  activeTab === 'connections'
                    ? 'bg-[#F0F0F0] text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 flex -space-x-2 overflow-hidden shrink-0 justify-center">
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" />
                </div>
                <span>Connections</span>
              </button>
            </nav>
          </div>

          {/* Right Main Content */}
          <div className="md:col-span-8 pl-0 md:pl-4">
            
            {activeTab === 'about' && (
              <div>
                {/* Section Title & Edit Button */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-bold">About me</h2>
                  <button className="px-4 py-1.5 bg-[#F0F0F0] text-gray-800 text-sm font-semibold rounded-full hover:bg-gray-200 transition">
                    Edit
                  </button>
                </div>

                {/* Profile Avatar Card & Complete Profile Callout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mb-12">
                  
                  {/* Avatar Card */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center h-64">
                    <div className="w-24 h-24 rounded-full bg-[#DDEDE2] text-[#004D40] flex items-center justify-center text-4xl font-semibold mb-4">
                      M
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Merna</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Guest</p>
                  </div>

                  {/* Complete Your Profile Box */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      Complete your profile
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your Airbnb profile is an important part of every reservation. Complete yours to help other hosts and guests get to know you.
                    </p>
                    <button className="mt-2 bg-[#E31C5F] hover:bg-[#D70466] text-white px-6 py-3 rounded-xl font-semibold text-sm transition">
                      Get started
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* Show Reviews Option */}
                <div className="flex items-center gap-3 cursor-pointer group">
                  <MessageSquare size={22} className="text-gray-800" />
                  <span className="text-base font-semibold text-gray-900 group-hover:underline">
                    Show reviews I've written
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Past trips</h2>
                <p className="text-gray-500 text-sm">You have no past trips yet.</p>
              </div>
            )}

            {activeTab === 'connections' && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Connections</h2>
                <p className="text-gray-500 text-sm">Manage your connected friends and hosts here.</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}