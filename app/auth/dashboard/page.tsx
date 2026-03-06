'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const serviceCategories = [
  {
    id: 1,
    name: 'Venues',
    description: 'Find the perfect venue for your event',
    icon: '🏛️',
    color: 'from-purple-600 to-blue-600',
    count: 245,
  },
  {
    id: 2,
    name: 'Decorations',
    description: 'Beautiful decorations & styling',
    icon: '🌸',
    color: 'from-pink-600 to-rose-600',
    count: 189,
  },
  {
    id: 3,
    name: 'Sound & DJ',
    description: 'Professional DJ & sound systems',
    icon: '🎵',
    color: 'from-orange-600 to-red-600',
    count: 127,
  },
  {
    id: 4,
    name: 'Photography',
    description: 'Capture your special moments',
    icon: '📸',
    color: 'from-cyan-600 to-blue-600',
    count: 156,
  },
  {
    id: 5,
    name: 'Catering',
    description: 'Delicious food & beverages',
    icon: '🍽️',
    color: 'from-green-600 to-emerald-600',
    count: 203,
  }

];

const upcomingEvents = [
  {
    id: 1,
    name: 'Mountain Wedding Ceremony',
    date: 'March 25, 2026',
    location: 'Kathmandu Valley',
    guests: 250,
    image: '🏔️',
  },
  {
    id: 2,
    name: 'Corporate Annual Conference',
    date: 'April 10, 2026',
    location: 'Pokhara Convention Center',
    guests: 500,
    image: '🏢',
  },
  {
    id: 3,
    name: 'Birthday Celebration',
    date: 'April 15, 2026',
    location: 'Luxury Resort',
    guests: 100,
    image: '🎉',
  },
];

export default function Page() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

    const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Profile Button */}
      <header className="fixed top-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/user/profile">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
            <span>👤</span>
            Profile
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              My Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              Your Personal Event Planner in Your Pocket
            </p>
            <p className="text-gray-400 text-lg">Plan, organize, and execute your perfect events</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Events Planned', value: '12' },
              { label: 'Services', value: '1000+' },
              { label: 'Happy Users', value: '5K+' },
              { label: 'Cities', value: '15' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 text-center hover:border-white/20 transition">
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Upcoming Events</h2>
          <p className="text-gray-400 mb-8">Stay organized with your planned events</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {event.image}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{event.name}</h3>
                  <div className="space-y-2 text-sm text-gray-300 mb-4">
                    <div>📅 {event.date}</div>
                    <div>📍 {event.location}</div>
                    <div>👥 {event.guests} Guests</div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse Services</h2>
          <p className="text-gray-400 mb-8">Explore all available services for your event</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                onClick={()=>router.push("/auth/venues")}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6 text-white">
                    <div>
                      <div className="text-5xl mb-4">{category.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90">{category.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {category.count} Services
                      </span>
                      <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80" />
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Start booking your dream event vendors today with My Events
              </p>
              <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                Create New Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 My Events. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}