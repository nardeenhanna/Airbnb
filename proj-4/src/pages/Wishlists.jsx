import React from 'react';
import { History, Menu, Globe } from 'lucide-react';

export default function Wishlists() {
  // رابط صورة الروفتوف والمسبح المطابق للتصميم
  const poolImageUrl = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between dir-ltr" dir="ltr">
      
      {/* 1. Header Navbar */}
      <header className="border-b border-gray-200 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#FF385C] font-bold text-2xl tracking-tighter cursor-pointer">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8-8 8-2.302 0-4.512-1.022-6.035-2.76L16 28.878l-.465.556C14.012 31.178 11.802 32 9.5 32c-4.4 0-8-3.592-8-8 0-.962.247-1.884.922-3.511l.194-.436c1.023-2.35 5.183-11.06 7.137-14.89l.533-1.025C11.537 1.963 12.992 1 15 1zm0 2c-1.242 0-2.287.636-3.411 2.651l-.479.921c-1.92 3.765-6.027 12.368-6.992 14.63l-.16.376c-.579 1.382-.758 2.083-.798 2.766L4.15 24c0 3.314 2.686 6 6 6 1.79 0 3.52-.821 4.721-2.228l.829-.972.829.972C17.78 29.179 19.51 30 21.3 30c3.314 0 6-2.686 6-6 0-.726-.188-1.482-.808-2.962l-.15-.348c-.965-2.262-5.072-10.865-6.992-14.63l-.479-.921C17.747 3.636 16.702 3 15 3z" />
          </svg>
          <span className="text-xl font-bold tracking-normal">airbnb</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition">
            Become a host
          </button>
          
          <div className="w-10 h-10 rounded-full bg-[#DDEDE2] text-[#004D40] flex items-center justify-center font-semibold text-sm">
            M
          </div>

          <button className="p-2.5 border border-gray-300 rounded-full hover:shadow-md transition">
            <Menu size={18} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 w-full mb-auto">
        <h1 className="text-3xl font-bold mb-8">Wishlists</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Recently viewed */}
          <div className="cursor-pointer group">
            <div className="w-full aspect-square bg-[#8C8C8C] rounded-2xl flex items-center justify-center mb-3 transition group-hover:shadow-md">
              <History size={56} className="text-white stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Recently viewed</h3>
          </div>

          {/* Card 2: My Wishlist (مع الصورة المضافة) */}
          <div className="cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 border border-gray-100 transition group-hover:shadow-md">
              <img 
                src={poolImageUrl} 
                alt="My Wishlist" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">My Wishlist</h3>
            <p className="text-sm text-gray-500">1 saved</p>
          </div>

        </div>
      </main>

      {/* 3. Footer Section */}
      <footer className="bg-[#F7F7F7] border-t border-gray-200 text-gray-800 text-sm w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Get help with a safety issue</a></li>
                <li><a href="#" className="hover:underline">AirCover</a></li>
                <li><a href="#" className="hover:underline">Travel insurance</a></li>
                <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
                <li><a href="#" className="hover:underline">Disability support</a></li>
                <li><a href="#" className="hover:underline">Cancellation options</a></li>
                <li><a href="#" className="hover:underline">Report neighborhood concern</a></li>
              </ul>
            </div>

            {/* Hosting */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                <li><a href="#" className="hover:underline">Airbnb your experience</a></li>
                <li><a href="#" className="hover:underline">Airbnb your service</a></li>
                <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                <li><a href="#" className="hover:underline">Hosting resources</a></li>
                <li><a href="#" className="hover:underline">Community forum</a></li>
                <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
                <li><a href="#" className="hover:underline">Airbnb-friendly apartments</a></li>
                <li><a href="#" className="hover:underline">Join a free hosting class</a></li>
                <li><a href="#" className="hover:underline">Find a co-host</a></li>
                <li><a href="#" className="hover:underline">Refer a host</a></li>
              </ul>
            </div>

            {/* Airbnb */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:underline">2026 Summer Release</a></li>
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Gift cards</a></li>
                <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-700">
            
            <div className="flex flex-wrap items-center gap-1.5 text-center md:text-left">
              <span>© 2026 Airbnb, Inc.</span>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline flex items-center gap-1">
                Your Privacy Choices
                <svg className="w-6 h-3 inline-block" viewBox="0 0 26 12" fill="none">
                  <rect width="26" height="12" rx="6" fill="#0066CC" />
                  <path d="M5 6L8 9L13 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3L21 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M21 3L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-6 font-semibold">
              <button className="flex items-center gap-2 hover:underline">
                <Globe size={16} />
                <span>English (US)</span>
              </button>
              
              <button className="hover:underline">
                EGP
              </button>

              <div className="flex items-center gap-4 text-gray-900">
                <a href="#" aria-label="Facebook" className="hover:opacity-80">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="X" className="hover:opacity-80">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:opacity-80">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}