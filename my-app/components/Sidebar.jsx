"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      
      {/* Title */}
      <h2 className="text-xl font-bold mb-6">
        DSA Visualizer
      </h2>

      {/* Menu Items */}
      <div className="space-y-3 w-full">
        
        <Link href="/" className="block p-2 rounded hover:bg-gray-700 cursor-pointer">
          Home
        </Link>

        <Link href="/sorting" className="block p-2 rounded hover:bg-gray-700 cursor-pointer">
          Sorting
        </Link>

        

      </div>
    </div>
  );
}