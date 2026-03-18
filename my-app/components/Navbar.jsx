"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div className="text-xl font-bold tracking-wide">
          DSA Visualizer
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link href='/' className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/sorting" className="hover:text-blue-400 transition">
            Sorting
          </Link>
          <Link href="/vjbf" className="hover:text-blue-400 transition">
            About
          </Link>
        </div>

      </div>
    </nav>
  );
}