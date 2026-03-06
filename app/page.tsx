import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1">

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Manage events. Delight attendees.
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Create, manage and promote events with MyEvents — simple, fast, and collaborative.
            </p>

            <div className="flex gap-4">

              {/* Register */}
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                Get Started
              </Link>

              {/* Login */}
              <Link
                href="/login"
                className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-lg transition"
              >
                Login
              </Link>

            </div>

          </div>

         
          

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 hover:border-white/30 transition">
            <h3 className="font-semibold text-lg mb-2">Event Builder</h3>
            <p className="text-gray-400">
              Quickly create events with rich details and ticketing options.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 hover:border-white/30 transition">
            <h3 className="font-semibold text-lg mb-2">Attendee Management</h3>
            <p className="text-gray-400">
              Track registrations, check-ins, and attendee communication in one place.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 hover:border-white/30 transition">
            <h3 className="font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-gray-400">
              Understand event performance with real-time metrics and reports.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MyEvents. All rights reserved.</p>
      </footer>

    </main>
  );
}