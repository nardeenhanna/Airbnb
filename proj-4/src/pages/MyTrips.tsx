import React from 'react';

export const MyTrips: React.FC = () => {
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Cairo, Egypt',
      dates: 'Oct 12 - Oct 18, 2026',
      host: 'Ahmed',
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      destination: 'Alexandria, Egypt',
      dates: 'Nov 01 - Nov 05, 2026',
      host: 'Mona',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Trips</h2>

      {upcomingTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTrips.map((trip) => (
            <div
              key={trip.id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row"
            >
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full sm:w-40 h-36 object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{trip.destination}</h3>
                  <p className="text-sm text-gray-500 mt-1">{trip.dates}</p>
                  <p className="text-xs text-gray-400 mt-1">Hosted by {trip.host}</p>
                </div>
                <button className="mt-3 text-xs font-semibold text-[#FF385C] hover:underline self-start">
                  View Reservation Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500">No trips booked yet.</p>
        </div>
      )}
    </div>
  );
};

// هذا السطر هو الذي يمنع ظهور الصفحة البيضاء
export default MyTrips;