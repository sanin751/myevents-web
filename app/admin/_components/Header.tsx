"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {

  const { logout, user } = useAuth();

  return (

    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-700">

      <nav className="max-w-7xl mx-auto px-6">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/admin"
            className="flex items-center gap-3 group"
          >

            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg">
              A
            </div>

            <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </span>

          </Link>


          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* User Info */}
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>

              <span className="text-sm font-medium text-gray-300 hidden sm:block">
                {user?.email || "Admin"}
              </span>

            </div>


            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium rounded-lg 
              bg-slate-800 border border-slate-700
              text-gray-200
              hover:bg-slate-700
              transition"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

    </header>

  );

}