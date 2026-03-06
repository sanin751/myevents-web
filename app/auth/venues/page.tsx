"use client";

import { useEffect, useState } from "react";

export default function VenuesPage() {

  const [search, setSearch] = useState("");
  const [banquets, setBanquets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");

  // fetch venues
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/banquets");
      const data = await res.json();

      if (data.success) {
        setBanquets(data.banquets);
      }

    } catch (error) {
      console.error("Error fetching venues", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // get token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("auth_token="));

    if (!tokenCookie) return null;

    return tokenCookie.split("=")[1];
  };

  // create booking
  const handleBooking = async () => {
    try {

      if (!selectedVenue || !selectedDate) return;

      setLoading(true);

      const token = getTokenFromCookie();

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await fetch("http://localhost:5050/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          venueId: selectedVenue._id,
          eventDate: selectedDate,
          guestCount: selectedVenue.capacity,
          totalPrice: selectedVenue.price
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Booking created successfully!");
        setSelectedVenue(null);
        setSelectedDate("");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBanquets = banquets.filter((venue) =>
    venue.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Explore Venues
          </h1>

          <p className="text-gray-400 text-lg">
            Discover the perfect venue for your special event
          </p>

        </div>

        {/* Search */}
        <div className="mb-10 flex justify-center">

          <input
            type="text"
            placeholder="Search venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />

        </div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredBanquets.map((venue) => (

            <div
              key={venue._id}
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >

              {/* Image */}
             <div className="h-40 overflow-hidden">

  {venue.image ? (
    <img
      src={`http://localhost:5050/uploads/${venue.image}`}
      alt={venue.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl text-white">
      🏛️
    </div>
  )}

</div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-bold text-white mb-2">
                  {venue.title}
                </h3>

                <p className="text-gray-400 text-sm mb-3">
                  {venue.description}
                </p>

                <div className="space-y-2 text-gray-300 text-sm mb-4">
                  <div>📍 {venue.location}</div>
                  <div>👥 {venue.capacity} Guests</div>
                  <div>💰 Rs. {venue.price}</div>
                </div>

                <button
                  onClick={() => setSelectedVenue(venue)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Booking Modal */}
      {selectedVenue && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md border border-white/10">

            <h2 className="text-xl font-bold text-white mb-4">
              Select Event Date
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/10 text-white"
            />

            <div className="flex gap-3">

              <button
                onClick={handleBooking}
                disabled={!selectedDate || loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                onClick={() => setSelectedVenue(null)}
                className="flex-1 bg-gray-700 text-white py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}