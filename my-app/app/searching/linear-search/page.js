"use client";
import GoBackButton from "@/components/GoBackButton";
import { Moon, Sun } from "lucide-react";
import React, { use, useEffect, useState } from "react";

const page = () => {
  const [dark, setDark] = useState(true);
  const [arrayLength, setArrayLength] = useState(10);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("");
  const [searching, setSearching] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);

  const generateArray = () => {
    if (searching) return;

    const arr = Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * 100) + 1,
    );

    setArray(arr);
    resetState();
  };

  useEffect(() => {
    generateArray();
  }, [arrayLength]);

  const resetState = () => {
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setMessage(null);
  };

  const linearSearch = async () => {
    if (searching) return;

    const num = Number(target);
    if (isNaN(num) || target === "") {
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
        setMessage(num+" found at index no. "+i);
        setMessageColor("text-green-500")
        console.log(message);
        return;
      }
      setCurrentIndex(-1);
    }

    setSearching(false);
    setMessage("Element not found...")
    setMessageColor("text-red-500")
    
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  
  const handleCustomInput = () => {
    if (searching) return;

    try {
      const values = customInput
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num !== "")
        .map((num) => Number(num));

      if (values.length === 0) {
        alert("Please enter a valid numbers");
        return;
      }
      if (values.some(isNaN)) {
        alert("Invalid input! only numbers are allowed");
        return;
      }
      if (values.length > 15) {
        alert("upto 15 length is allowed");
        return;
      }
      if (values.some((v) => v < 1 || v > 100)) {
        alert("keep values between 1 to 100");
        return;
      }

      setArray(values);
      // setArrayLength(values.length);
      resetState();
      setPopupOpen(false);
      setCustomInput("");
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };



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

        {message && (
          <div className={`${messageColor}  text-center font-bold text-xl pt-5`}>
            {message}
          </div>
        )}

        <div className="flex justify-center items-end h-[50vh] gap-4 ">
          {array.map((value, index) => {
            let color = "bg-blue-500";

            if (index === foundIndex) {
              color = "bg-green-500 scale-120";
            } else if (index === currentIndex) {
              color = "bg-yellow-400";
            }

            return (
              <div
                key={index}
                className={`${color} w-12 rounded-t-2xl flex items-end justify-center ${dark ? "text-white" : "text-black"} font-bold transition-all duration-500`}
                style={{ height: `${value * 3}px` }}
              >
                {value}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex gap-4">
            <button
              onClick={generateArray}
              className="px-4 py-2 bg-blue-400 text-black font-bold rounded"
            >
              Generate Array
            </button>

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

          <div className="flex gap-4 justify-center items-center">
            <div className="font-extrabold text-xl">Enter Target Value:</div>

            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target"
              className={`px-3 py-2 rounded text-black font-extrabold ${dark ? "bg-gray-300 " : "bg-gray-400"}`}
            />
          </div>

          <div className="flex gap-4 font-extrabold">
            <span>Adjust Length</span>
            <input
              type="range"
              value={arrayLength}
              disabled={searching}
              onChange={(e) => setArrayLength(Number(e.target.value))}
              min="5"
              max="15"
              className="bg-gray-500"
            />
            <span>{arrayLength}</span>

            <div>
              <button
                onClick={() => setPopupOpen(true)}
                disabled={searching}
                className={`bg-gray-300 hover:bg-gray-500 rounded-2xl py-1 px-3 text-black ${searching ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Custom Array
              </button>

              {/* popup window for array input */}
              {popupOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">
                      Enter Custom Array
                    </h2>

                    {/* Example input field */}
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="e.g. 10, 20, 30, 40"
                      className="w-full border p-2 mb-4"
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setPopupOpen(false)}
                        className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCustomInput}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
