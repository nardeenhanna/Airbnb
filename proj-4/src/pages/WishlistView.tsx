import React from 'react';
import { Heart, MapPin, Star } from 'lucide-react';


 interface WishlistViewProps {
  wishlist: any[];
  onRemove: (id: string) => void;
}
export const WishlistView: React.FC<WishlistViewProps> = ({ wishlist, onRemove }) => {
  if (wishlist.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">قائمة المفضلة فارغة</h3>
        <p className="text-sm text-gray-500 mt-1">تصفح العقارات واحفظ الأماكن التي تعجبك للرجوع إليها لاحقاً.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {wishlist.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group">
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <button
              onClick={() => onRemove(item.id)}
              className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-md text-red-500 rounded-full hover:bg-white transition shadow-sm"
            >
              <Heart size={18} fill="currentColor" />
            </button>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                {item.rating}
              </div>
              <span className="text-xs font-medium text-gray-500">
                <strong className="text-base text-indigo-600 font-bold">${item.pricePerNight}</strong> / ليلة
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
            
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <MapPin size={14} />
              {item.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WishlistView;