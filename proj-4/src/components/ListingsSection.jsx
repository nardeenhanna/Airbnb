import React from "react";
import ListingCard from "./ListingCard";
import { TbChevronRight } from "react-icons/tb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// قائمة الأقسام والعقارات كاملة
const sectionsData = [
  {
    category: "homes",
    title: "Stay in 6th of October City",
    items: [
      { id: 1, title: "Apartment in 6th of October City", price: "9,078 EGP for 2 nights", rating: "4.97", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
      { id: 2, title: "Apartment in 6th of October City", price: "4,500 EGP for 2 nights", rating: "4.8", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500" },
      { id: 3, title: "Apartment in Sheikh Zayed City", price: "4,216 EGP for 2 nights", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500" },
      { id: 4, title: "Apartment in Sheikh Zayed City", price: "6,300 EGP for 2 nights", rating: "4.9", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500" },
      { id: 5, title: "Apartment in 6th of October City", price: "4,708 EGP for 2 nights", rating: "4.8", badge: "", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" },
      { id: 6, title: "Apartment in Sheikh Zayed City", price: "7,085 EGP for 2 nights", rating: "4.5", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" },
      { id: 7, title: "Apartment in 6th of October City", price: "10,503 EGP for 2 nights", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500" },
    ]
  },
  {
    category: "homes",
    title: "Popular homes in New Cairo",
    items: [
      { id: 8, title: "Tiny home in First New Cairo Qism", price: "2,289 EGP for 2 nights", rating: "4.95", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500" },
      { id: 9, title: "Room in First New Cairo Qism", price: "2,352 EGP for 2 nights", rating: "4.8", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500" },
      { id: 10, title: "Tiny home in First New Cairo Qism", price: "2,045 EGP for 2 nights", rating: "4.91", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500" },
      { id: 11, title: "Apartment in First New Cairo Qism", price: "8,590 EGP for 2 nights", rating: "4.97", badge: "", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500" },
      { id: 12, title: "Apartment in El Shorouk", price: "8,100 EGP for 2 nights", rating: "4.87", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500" },
      { id: 13, title: "Apartment in Second New Cairo Qism", price: "6,684 EGP for 2 nights", rating: "4.98", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=500" },
      { id: 14, title: "Room in First New Cairo Qism", price: "2,700 EGP for 2 nights", rating: "4.8", badge: "", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500" },
    ]
  },
  {
    category: "experiences",
    title: "Great hotels for your next trip",
    subtitle: "Plus, get Airbnb credit when you stay at a featured hotel.",
    items: [
      { id: 15, title: "Hotel Florida Concept", price: "20,267 EGP for 2 nights", rating: "4.79", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500" },
      { id: 16, title: "Arman Arkaan Hotel", price: "23,243 EGP for 2 nights", rating: "4.7", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500" },
      { id: 17, title: "Isabella's House", price: "24,776 EGP for 2 nights", rating: "4.8", badge: "", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500" },
      { id: 18, title: "H10 Marina Barcelona", price: "27,897 EGP for 2 nights", rating: "4.81", badge: "", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500" },
      { id: 19, title: "Sercotel Caspe Hotel", price: "32,708 EGP for 2 nights", rating: "4.84", badge: "", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500" },
      { id: 20, title: "Catalonia Sagrada Familia", price: "25,288 EGP for 2 nights", rating: "4.81", badge: "", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500" },
      { id: 21, title: "Tres Torres Atiram Hotels", price: "28,292 EGP for 2 nights", rating: "4.82", badge: "", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500" },
    ]
  },
  {
    category: "homes",
    title: "Available next month in Hurghada",
    items: [
      { id: 22, title: "Home in Hurghada", price: "25,767 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500" },
      { id: 23, title: "Apartment in Hurghada", price: "2,843 ج.م", rating: "4.86", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" },
      { id: 24, title: "Home in Hurghada", price: "17,756 ج.م", rating: "4.92", badge: "", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" },
      { id: 25, title: "Apartment in Hurghada", price: "12,328 ج.م", rating: "4.85", badge: "", img: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=500" },
      { id: 26, title: "Apartment in Hurghada", price: "2,756 ج.م", rating: "4.95", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
      { id: 27, title: "Apartment in Hurghada", price: "7,164 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500" },
    ]
  },
  {
    category: "services",
    title: "Homes in Dubai",
    items: [
      { id: 28, title: "Apartment in Business Bay", price: "9,544 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500" },
      { id: 29, title: "Apartment in Downtown Dubai", price: "34,853 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500" },
      { id: 30, title: "Apartment in Business Bay", price: "48,486 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500" },
      { id: 31, title: "Apartment in Marsa Dubai", price: "8,093 ج.م", rating: "5.0", badge: "Guest favorite", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500" },
      { id: 32, title: "Apartment in Business Bay", price: "14,586 ج.م", rating: "5.0", badge: "", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500" },
      { id: 33, title: "Apartment in Al-Wasl", price: "21,658 ج.م", rating: "5.0", badge: "", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500" },
    ]
  }
];

export default function ListingsSection({ activeCategory = "all", onSelectListing }) {
  const filteredSections = activeCategory === "all" || !activeCategory
    ? sectionsData
    : sectionsData.filter((sec) => sec.category === activeCategory);

  return (
    <div className="listings-container w-full px-6 sm:px-10 lg:px-14 py-6">
      {filteredSections.map((section, idx) => (
        <div key={idx} className="section-block mb-10">
          {/* Header Section */}
          <div className="section-header mb-4">
            <h2 className="section-title text-xl font-bold">
              <span>{section.title}</span>
            </h2>
            {section.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{section.subtitle}</p>
            )}
          </div>
          
          {/* Cards Grid */}
          <div className="cards-grid">
            {section.items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onSelectListing && onSelectListing(item)} 
                className="cursor-pointer"
              >
                <ListingCard item={item} />
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}