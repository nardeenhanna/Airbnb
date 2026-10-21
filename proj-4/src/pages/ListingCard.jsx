import React, { useState } from 'react';

export const ListingCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // التأكد من قراءة الصورة سواء جاية كـ array أو string
  const imageUrl = Array.isArray(item.images) ? item.images[0] : item.img;

  return (
    <div className="card-item cursor-pointer">
      {/* Image Container */}
      <div className="img-wrapper relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
        <img 
          src={imageUrl} 
          alt={item.title}
          className="card-img h-full w-full object-cover transition hover:scale-105"
        />

        {/* Guest Favorite Badge */}
        {item.badge && (
          <div className="guest-favorite-badge absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm z-10">
            <span className="text-[11px] font-semibold text-gray-900">{item.badge}</span>
          </div>
        )}

        {/* Heart Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="heart-btn absolute top-2.5 right-2.5 p-1 transition hover:scale-110 z-10"
          aria-label="Add to wishlist"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={isFavorite ? "#FF385C" : "rgba(0,0,0,0.4)"} 
            viewBox="0 0 24 24" 
            strokeWidth={1.8} 
            stroke="white" 
            className="w-6 h-6 transition-colors"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.575-4.683-4.575-2.016 0-3.743 1.258-4.317 3.038-.574-1.78-2.301-3.038-4.317-3.038C5.1 3.675 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Details - Layout مطابق لـ Airbnb */}
      <div className="card-info mt-2 flex flex-col gap-0.5">
        <h3 className="card-title text-[13px] font-semibold text-gray-900 truncate">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between text-[13px]">
          <span className="bold-price font-semibold text-gray-900">
            {item.price || `${item.pricePerNight} EGP`}
          </span>
          
          <div className="card-rating flex items-center gap-1 text-gray-900 font-medium">
            <span className="text-[10px]">★</span>
            <span className="rating-num text-[12px]">{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;