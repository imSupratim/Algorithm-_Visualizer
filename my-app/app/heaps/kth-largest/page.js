"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [array, setArray] = useState([]);
  const [heap, setHeap] = useState([]);
  const [k, setK] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [removed, setRemoved] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    if (running) return;
    const arr = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(arr);
    setHeap([]);
    setAnswer(null);
    setCurrentIndex(-1);
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const startVisualization = async () => {
    if (running) return;

    setRunning(true);
    let minHeap = [];

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(700);

      // Insert into heap
      minHeap.push(array[i]);
      minHeap.sort((a, b) => a - b);
      setHeap([...minHeap]);

      await sleep(700);

      // Maintain size k
      if (minHeap.length > k) {
        const removedVal = minHeap.shift();
        setRemoved(removedVal);
        setHeap([...minHeap]);
        await sleep(700);
      }
    }

    setAnswer(minHeap[0]);
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Kth Largest Element (Min Heap)
      </h1>

      {/* ARRAY */}
      <div className="flex justify-center gap-3 mb-10">
        {array.map((val, idx) => {
          let color = "bg-blue-500";

          if (idx === currentIndex) color = "bg-yellow-400 text-black";

          return (
            <div
              key={idx}
              className={`${color} w-12 h-12 flex items-center justify-center rounded shadow-lg transition-all duration-300`}
            >
              {val}
            </div>
          );
        })}
      </div>

      {/* HEAP */}
      <h2 className="text-xl text-center mb-3">Min Heap (size ≤ {k})</h2>
      <div className="flex justify-center gap-3 mb-6">
        {heap.map((val, idx) => (
          <div
            key={idx}
            className="w-12 h-12 bg-purple-500 flex items-center justify-center rounded shadow-md"
          >
            {val}
          </div>
        ))}
      </div>

      {/* REMOVED ELEMENT */}
      {removed !== null && (
        <p className="text-center text-red-400 mb-4">
          Removed: {removed}
        </p>
      )}

      {/* ANSWER */}
      {answer !== null && (
        <p className="text-center text-green-400 text-xl font-bold">
          Kth Largest Element: {answer}
        </p>
      )}

      {/* CONTROLS */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <input
          type="number"
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="px-3 py-2 text-black rounded"
          placeholder="Enter k"
        />

        <button
          onClick={generateArray}
          className="px-4 py-2 bg-blue-500 rounded font-bold"
        >
          Generate Array
        </button>

        <button
          onClick={startVisualization}
          disabled={running}
          className={`px-6 py-2 rounded font-bold ${
            running
              ? "bg-gray-500"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {running ? "Running..." : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Page;