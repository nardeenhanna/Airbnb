const [reservation, setReservation] = useState(null)

<button
  onClick={() =>
    setReservation({
      listing: activeListing.title,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guestsCount,
    })
  }
  className="w-full bg-black text-white py-3 rounded-lg font-bold"
>
  Reserve
</button>

{reservation && (
  <div className="mt-4 p-4 border rounded-xl bg-gray-50">
    <h3 className="font-bold text-lg">Reservation Confirmed ✅</h3>

    <p>Property: {reservation.listing}</p>
    <p>Check-in: {reservation.checkIn}</p>
    <p>Check-out: {reservation.checkOut}</p>
    <p>Guests: {reservation.guests}</p>
  </div>
)}