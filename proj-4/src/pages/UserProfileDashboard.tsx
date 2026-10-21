import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Calendar, 
  Bell, 
  LogOut 
} from 'lucide-react';

// استدعاء المكونات الفرعية
import ProfileForm from '../components/ProfileForm';
import WishlistView from './WishlistView';
import BookingsView from './BookingView';

// البيانات التجريبية (Mock Data)
const mockUser: any = {
  id: '1',
  name: 'أحمد محمود',
  email: 'ahmed@example.com',
  phone: '+20 123 456 7890',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'
};

const mockWishlist: any[] = [
  {
    id: 'p1',
    title: 'فيلا فاخرة بمسبح خاص',
    location: 'شرم الشيخ، مصر',
    pricePerNight: 250,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'p2',
    title: 'شقة مطلة على البحر مباشرة',
    location: 'الإسكندرية، مصر',
    pricePerNight: 120,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600'
  }
];

const mockBookings: any[] = [
  {
    id: 'b1',
    property: mockWishlist[0],
    checkIn: '2026-10-15',
    checkOut: '2026-10-20',
    totalPrice: 1250,
    status: 'upcoming'
  },
  {
    id: 'b2',
    property: mockWishlist[1],
    checkIn: '2026-06-01',
    checkOut: '2026-06-05',
    totalPrice: 480,
    status: 'completed'
  }
];

const mockNotifications: any[] = [
  {
    id: 'n1',
    title: 'تأكيد الحجز',
    message: 'تم تأكيد حجزك في فيلا فاخرة بمسبح خاص بنجاح.',
    date: 'منذ ساعتين',
    isRead: false,
    type: 'booking'
  },
  {
    id: 'n2',
    title: 'عرض خاص',
    message: 'خصم 20% على العقارات الموجودة في قائمة المفضلة لديك!',
    date: 'أمس',
    isRead: true,
    type: 'promo'
  }
];

export default function UserProfileDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'trips'>('profile');
  const [user, setUser] = useState<any>(mockUser);
  const [wishlist, setWishlist] = useState<any[]>(mockWishlist);
  const [bookings, setBookings] = useState<any[]>(mockBookings);
  const [notifications, setNotifications] = useState<any[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);

  // حذف عنصر من المفضلة
  const handleRemoveFromWishlist = (propertyId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== propertyId));
  };

  // تحديد الإشعار كمقروء
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dir-rtl" dir="rtl">
      {/* الشريط العلوي */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">لوحة المستخدم</h1>

          <div className="flex items-center gap-4">
            {/* الإشعارات */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full relative transition"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* قائمة الإشعارات المنسدلة */}
              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">الإشعارات</h3>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                      {unreadCount} غير مقروء
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-sm text-gray-500">لا توجد إشعارات جديدة</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkAsRead(n.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition flex items-start justify-between ${
                            !n.isRead ? 'bg-indigo-50/30' : ''
                          }`}
                        >
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{n.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                            <span className="text-[10px] text-gray-400 mt-2 block">{n.date}</span>
                          </div>
                          {!n.isRead && (
                            <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* صورة الحساب */}
            <div className="flex items-center gap-3 pr-2 border-r border-gray-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* القائمة الجانبية */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                  activeTab === 'profile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User size={18} />
                الملف الشخصي
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                  activeTab === 'wishlist'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart size={18} />
                المفضلة ({wishlist.length})
              </button>

              <button
                onClick={() => setActiveTab('trips')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                  activeTab === 'trips'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Calendar size={18} />
                حجوزاتي
              </button>

              <hr className="my-2 border-gray-100" />

              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition">
                <LogOut size={18} />
                تسجيل الخروج
              </button>
            </nav>
          </aside>

          {/* عرض تبويب المحتوى */}
          <main className="lg:col-span-3">
            {activeTab === 'profile' && <ProfileForm user={user} onUpdate={setUser} />}
            {activeTab === 'wishlist' && (
              <WishlistView wishlist={wishlist} onRemove={handleRemoveFromWishlist} />
            )}
            {activeTab === 'trips' && <BookingsView bookings={bookings} />}
          </main>
        </div>
      </div>
    </div>
  );
}