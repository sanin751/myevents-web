"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👤" },
  { href: "/admin/banquets", label: "Banquets", icon: "🏛" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname?.startsWith(href);

  return (
    <aside
      className="
      fixed md:static
      top-0 left-0
      h-screen w-64
      bg-slate-900
      border-r border-slate-700
      z-40 overflow-y-auto
    "
    >

      {/* Logo */}
      <div className="p-5 border-b border-slate-700">
        <Link href="/admin" className="flex items-center gap-3">

          <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold shadow">
            A
          </div>

          <span className="font-semibold text-gray-200 text-lg">
            Admin Panel
          </span>

        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-2">

        {ADMIN_LINKS.map((link) => {

          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
              
              ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }
              
              `}
            >

              <span className="text-lg">{link.icon}</span>

              <span>{link.label}</span>

            </Link>
          );
        })}

      </nav>

    </aside>
  );
}