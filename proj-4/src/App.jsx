import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // 🟢 إضافة useNavigate
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import AuthModal from './pages/Login';
import HostDashboard from './pages/HostDashboard';
import Navbar from './components/Navbar';
import ListingsSection from './components/ListingsSection';
import Footer from './components/Footer';

// 🚀 استدعاء جميع الصفحات الجديدة
import UserProfile from './pages/UserProfile';
import UserProfileDashboard from './pages/UserProfileDashboard';
import MyTrips from './pages/MyTrips';
import Wishlists from './pages/Wishlists';
import BookingView from './pages/BookingView';
import WishlistView from './pages/WishlistView';


import './index.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function App() {
  const navigate = useNavigate(); // 🟢 تفعيل أداة التوجيه
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState('guest');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // حالة العقار المحدد
  const [selectedListing, setSelectedListing] = useState(null);

  // 🔄 فحص وجود الـ JWT Token في الـ LocalStorage عند تحميل التطبيق
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const imgUrl = selectedListing?.img || (Array.isArray(selectedListing?.images) ? selectedListing.images[0] : '');
  const coords = selectedListing?.coords || [30.0300, 31.4700];

  // 🟢 دالة تسجيل الخروج المنظمة
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // 🟢 دالة الحجز المنتقلة
  const handleReserve = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
    } else {
      navigate('/booking', { state: { listing: selectedListing } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        isAuthenticated={isAuthenticated}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        <Routes>
          {/* 1️⃣ الصفحة الرئيسية + تفاصيل العقار */}
          <Route
            path="/"
            element={
              viewMode === 'host' ? (
                <HostDashboard />
              ) : selectedListing ? (
                <div className="bg-white text-gray-900 pt-6 min-h-screen" dir="ltr">
                  <div className="max-w-6xl mx-auto px-6">
                    <button
                      onClick={() => setSelectedListing(null)}
                      className="mb-6 inline-flex items-center gap-2 font-semibold text-xs border rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer shadow-xs transition"
                    >
                      ← Back to listings
                    </button>

                    <h1 className="text-2xl font-bold mb-4">{selectedListing.title}</h1>

                    {/* الصور المعروضة */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-8 h-[380px] relative">
                      <div className="md:col-span-2 h-full">
                        <img src={imgUrl} alt="main" className="w-full h-full object-cover" />
                      </div>
                      <div className="hidden md:grid grid-cols-2 col-span-2 gap-2 h-full">
                        <img src={imgUrl} alt="sub1" className="w-full h-[186px] object-cover" />
                        <img src={imgUrl} alt="sub2" className="w-full h-[186px] object-cover" />
                        <img src={imgUrl} alt="sub3" className="w-full h-[186px] object-cover" />
                        <img src={imgUrl} alt="sub4" className="w-full h-[186px] object-cover" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                      <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-1">{selectedListing.title}</h2>
                        <p className="text-sm text-gray-500 mb-6">4 guests · 2 bedrooms · 3 beds · 2 baths</p>
                        <p className="text-sm text-gray-700">★ {selectedListing.rating || 'New'} · Guest favorite</p>
                      </div>
                      <div className="lg:col-span-1 border rounded-2xl p-6 shadow-xl bg-white">
                        <span className="text-2xl font-extrabold">{selectedListing.price || selectedListing.pricePerNight}</span>
                        
                        {/* 🟢 زر Reserve المحدث ليشتغل مثل Airbnb */}
                        <button
                          onClick={handleReserve}
                          className="w-full mt-4 bg-rose-600 text-white font-semibold py-3.5 rounded-xl hover:bg-rose-700 transition cursor-pointer text-center block shadow-md hover:shadow-lg"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>

                    {/* 🗺️ الخريطة داخل صفحة العقار */}
                    <div className="border-t pt-8 mb-12">
                      <h3 className="text-lg font-semibold mb-4">Where you'll be</h3>
                      <div className="w-full h-80 rounded-2xl overflow-hidden border z-0 relative">
                        <MapContainer center={coords} zoom={13} style={{ height: '100%', width: '100%' }}>
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={coords}>
                            <Popup>{selectedListing.title}</Popup>
                          </Marker>
                        </MapContainer>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ListingsSection 
                  activeCategory={activeCategory} 
                  onSelectListing={(item) => setSelectedListing(item)}
                />
              )
            }
          />

          {/* 2️⃣ المسارات المحسنة */}
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<UserProfileDashboard />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/wishlists" element={<Wishlists />} />
          <Route path="/booking" element={<BookingView />} />
          <Route path="/wishlist-details" element={<WishlistView />} />
        </Routes>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}