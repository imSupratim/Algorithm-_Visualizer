"use client";
import GoBackButton from "@/components/GoBackButton";
import { Moon, Sun } from "lucide-react";
import React, { use, useEffect, useState } from "react";

const page = () => {
  const [dark, setDark] = useState(true);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [searching, setSearching] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);

  const generateArray = () => {
    if (searching) return;

    const arr = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 1,
    );

    setArray(arr);
    resetState();
  };

  useEffect(() => {
    generateArray();
  }, []);

  const resetState = () => {
    setCurrentIndex(-1);
    setFoundIndex(-1);
  };

  const linearSearch = async () => {
    if (searching) return;

    const num = Number(target);
    if (isNaN(num)) {
      alert("Enter a valid number");
      return;
    }

    setSearching(true);
    resetState();

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(500);

      if (array[i] === num) {
        setFoundIndex(i);
        setSearching(false);
        return;
      }
    }

    setSearching(false);
    alert("Element not found");
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <>
      <header
        className={`py-5 ${
          dark
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          <span className="text-purple-400">Linear</span>{" "}
          <span className="text-purple-500">Search</span>{" "}
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className={`fixed  top-4 right-5 p-2  rounded-full cursor-pointer transition ${dark ? "bg-gray-700" : "bg-gray-200"}`}
        >
          {dark ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-blue-600" />
          )}
        </button>
      </header>

      <main
        className={`min-h-screen ${
          dark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
            : "bg-gradient-to-br from-gray-100 to-gray-300 text-black"
        }`}
      >
        <GoBackButton destination="/searching" />

        <div className="flex justify-center items-end h-[50vh] gap-2 ">
          {array.map((value, index) => {
            let color = "bg-blue-500";

            if (index === foundIndex) {
              color = "bg-green-500 scale-110";
            } else if (index === currentIndex) {
              color = "bg-yellow-400";
            }

            return (
              <div
                key={index}
                className={`${color} w-12 rounded-t-2xl flex items-end justify-center text-black font-bold transition-all duration-500`}
                style={{ height: `${value * 3}px` }}
              >
                {value}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4 mt-10">
          <button
            onClick={generateArray}
            className="px-4 py-2 bg-blue-400 text-black font-bold rounded"
          >
            Generate Array
          </button>

          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter target"
            className="px-3 py-2 rounded text-black"
          />

          <button
            onClick={linearSearch}
            disabled={searching}
            className={`px-4 py-2 font-bold rounded ${
              searching ? "bg-gray-500" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {searching ? "Searching..." : "Start Search"}
          </button>
        </div>
      </main>
    </>
  );
};

export default page;
