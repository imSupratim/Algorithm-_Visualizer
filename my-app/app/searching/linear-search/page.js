"use client"
import GoBackButton from "@/components/GoBackButton";
import { Moon, Sun } from "lucide-react";
import React, { use, useState } from "react";

const page = () => {
  const [dark, setDark] = useState(true);

  return (
    <>
      <header className={`py-5 ${dark?"bg-gray-700":"bg-gray-300"}`}>
        <h1 className="text-3xl font-bold text-center">
          <span className="text-purple-400">Linear</span>{" "}
          <span className="text-purple-500">Search</span>{" "}
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className={`fixed  top-4 right-5 p-2  rounded-full cursor-pointer transition ${dark? "bg-gray-700":"bg-gray-200"}`}
        >
          {dark ? <Sun className="text-yellow-400"/> : <Moon className="text-blue-600"/>}
        </button>
      </header>

      <main className={`min-h-screen ${dark?"bg-gray-900":"bg-gray-400"}`}>
        <GoBackButton destination="/searching" />



      </main>
    </>
  );
};

export default page;
