"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [arrayLength, setArrayLength] = useState(10);
  const [current, setCurrent] = useState(-1);
  const [sorted, setSorted] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [array, setArray] = useState(generateArray());
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);

  useEffect(() => {
    generateNewArray();
  }, [arrayLength]);

  useEffect(()=>{
    speedRef.current = speed;
  },[speed]);

  function generateArray() {
    return Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * 100) + 10,
    );
  }

  const getDelay = () => {
    const minDelay = 10;
    const maxDelay = 1000;

    const s = speedRef.current;
    return maxDelay - (s / 24) * (maxDelay - minDelay);
  };

  const generateNewArray = () => {
    if (sorting) {
      alert("sorting is in progress...");
      return;
    }
    setSorted(-1);
    setArray(generateArray());
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let j = i;
      setCurrent(i);
      setSorted(i - 1);
      await sleep(getDelay());
      while (j > 0 && arr[j] < arr[j - 1]) {
        setComparing(j - 1);
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        setArray([...arr]);
        j--;
        await sleep(getDelay());
      }
    }

    setSorting(false);
    setCurrent(-1);
    setComparing(-1);
    setSorted(n - 1);
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

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold ">
          <span className="text-orange-300">Insertion</span>{" "}
          <span className="text-orange-400">Sort</span>{" "}
          <span className="text-orange-500">Visualizer</span>
        </h1>
        {sorting && (
          <h2 className="mt-3 mb-3 text-green-500">
            Performing insertion sort...
          </h2>
        )}
      </div>

      <div className="flex items-end gap-1 h-80 mb-6">
        {array.map((value, index) => {
          let color = "bg-blue-500";
          if (index === current) {
            color = "bg-red-500";
          } else if (index === comparing) {
            color = "bg-yellow-500";
          } else if (index <= sorted) {
            color = "bg-green-500";
          }

          return (
            <div
              key={index}
              className={`${color} w-15 mx-2 flex justify-center p-2 text-2xl text-black font-bold `}
              style={{ height: `${value * 3}px` }}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mb-10">
        <button
          onClick={generateNewArray}
          className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 cursor-pointer text-gray-800 font-bold"
        >
          Generate New Array
        </button>

        <button
          onClick={selectionSort}
          disabled={sorting}
          className={`px-4 py-2 font-bold text-black ${
            sorting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 rounded hover:bg-purple-600 cursor-pointer"
          } `}
        >
          {sorting ? "Running..." : "Start Sorting"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <span>Adjust Length</span>
          <input
            type="range"
            value={arrayLength}
            disabled={sorting}
            onChange={(e) => setArrayLength(Number(e.target.value))}
            min="5"
            max="15"
            className="bg-gray-500"
          />
          <span>{arrayLength}</span>
        </div>

        <div className="flex gap-4">
          <span>Adjust Speed</span>
          <input
            type="range"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            min="1"
            max="20"
            className="bg-gray-500"
          />
          <span>{speed}</span>
        </div>
      </div>
    </div>
  );
}
