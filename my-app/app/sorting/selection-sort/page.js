"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [array, setArray] = useState(generateArray());
  const [sorting, setSorting] = useState(false);
  const [red, setRed] = useState(-1); //red
  const [green, setGreen] = useState(-1); //green

  function generateArray() {
    return Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 10,
    );
  }

  const generateNewArray = () => {
    if (sorting) return;
    setArray(generateArray());
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        setGreen(j);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }

        await sleep(400);
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await sleep(800);
      }
    }

    setSorting(false);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

    {/* Go back Link */}
      <div className="absolute top-4 left-4">
        <Link
          href="/sorting"
          className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
        >
          ⬅️ Go Back
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Selection Sort Visualizer</h1>

      {/* Bars */}
      <div className="flex items-end gap-1 h-80 mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`${index === green ? "bg-green-500" : "bg-blue-500"} w-15 mx-2 flex justify-center p-2`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={generateNewArray}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 cursor-pointer"
        >
          Generate New Array
        </button>

        <button
          onClick={selectionSort}
          className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 cursor-pointer"
        >
          Start Sorting
        </button>
      </div>
    </div>
  );
}
