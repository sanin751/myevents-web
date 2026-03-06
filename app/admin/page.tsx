import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage system resources from one place
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Users Card */}
          <Link
            href="/admin/users"
            className="p-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Manage Users
            </h2>

            <p className="opacity-90">
              View, edit and manage registered users.
            </p>
          </Link>

          {/* Banquets Card */}
          <Link
            href="/admin/banquets"
            className="p-8 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Manage Banquets
            </h2>

            <p className="opacity-90">
              View and manage banquet venues.
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}