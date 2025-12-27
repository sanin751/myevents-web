import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" >
      <div className="w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="My Events"
            className="mx-auto h-24"
          />
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Create a New Account
        </h2>

        {/* Form */}
        <div className="space-y-4">
          
          {/* First & Last Name */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Mobile Number */}
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* New Password */}
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Submit */}
          <button className="w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-400 transition">
            Create Account
          </button>

          {/* Login Link */}
          <Link
            href="/login"
            className="block text-sm text-blue-500 hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
