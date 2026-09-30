import React, { useState } from 'react';
import AuthModal from './pages/Login';
import HostDashboard from './pages/HostDashboard';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(true);  /* tft7 awl ma proj y4t8l by default-->true*/ 
  const [isAuthenticated, setIsAuthenticated] = useState(false); /*user logged in wala la -->false y3ni lesa not logged in*/
  const [viewMode, setViewMode] = useState('guest'); // 'guest' or 'host'

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top Navigation Bar 4r7*/}
      <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('guest')}>
          <svg className="h-8 w-8 text-[#FF385C]" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8-8 8-2.423 0-4.632-1.082-6.136-2.825L16 28.783l-.364.416C14.132 30.918 11.923 32 9.5 32 5.092 32 1.5 28.408 1.5 24c0-.924.243-1.805.91-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C11.474 1.963 12.929 1 14.937 1H16zm0 2h-1.063c-1.31 0-2.26.657-3.23 2.396l-.427.822c-1.87 3.666-5.938 12.18-6.85 14.305l-.105.257c-.524 1.25-.725 1.928-.725 2.22 0 3.314 2.686 6 6 6 1.83 0 3.513-.82 4.654-2.187l.746-.893.746.893C16.837 28.18 18.52 29 20.35 29c3.314 0 6-2.686 6-6 0-.292-.201-.97-.725-2.22l-.105-.257c-.912-2.125-4.98-10.639-6.85-14.305l-.427-.822C17.277 3.657 16.327 3 15.017 3H16z" />
          </svg>
          <span className="text-xl font-bold text-[#FF385C]">airbnb</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewMode(viewMode === 'host' ? 'guest' : 'host')}
            className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            {viewMode === 'host' ? 'Switch to Guesting' : 'Switch to Hosting'}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="rounded-full bg-[#FF385C] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#D70466]"
            >
              Log in / Sign up
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border p-1 pl-3 shadow-sm hover:shadow-md">
              <span className="text-sm font-semibold">Host Account</span>
              <div className="h-8 w-8 rounded-full bg-gray-700 text-xs font-bold text-white flex items-center justify-center">
                H
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main View Area */}
      <main className="p-8">
        {viewMode === 'host' ? (
          <HostDashboard />
        ) : (
          <div className="mx-auto max-w-4xl text-center py-20">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Find your next stay</h1>
            <p className="text-gray-600 mb-8">Search low prices on hotels, homes, and much more...</p>
            {!isAuthenticated && (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="rounded-xl bg-[#E81948] px-6 py-3 font-semibold text-white"
              >
                Get Started by Logging In
              </button>
            )}
          </div>
        )}
      </main>

      {/* Authentication Modal Overlay --> 34an tkon foa2 el bg -- end */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}