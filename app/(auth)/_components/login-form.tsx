import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" >
      <div className="w-full max-w-sm text-center">
        
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/images/logo.png" // place your MY Events logo here
            alt="My Events"
            className="mx-auto h-24"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />

          <button className="w-full py-3 bg-purple-900 text-white rounded font-semibold hover:bg-purple-800 transition">
            Log In
          </button>

          <Link
            href="/forgot-password"
            className="block text-sm text-blue-500 hover:underline"
          >
            Forgotten password?
          </Link>

          <Link
            href="/register"
            className="block w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-400 transition"
          >
            Create New Account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-500 flex justify-center gap-6">
          <span>About</span>
          <span>Help</span>
        </div>
      </div>
    </div>
  );
}
