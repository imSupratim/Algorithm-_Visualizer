"use client";
import { Notebook } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [arrayLength, setArrayLength] = useState(10);
  const [array, setArray] = useState(generateArray());
  const [sorting, setSorting] = useState(false);
  const [red, setRed] = useState(-1); // current
  const [green, setGreen] = useState(-1); //comparing
  const [yellow, setYellow] = useState(-1); //minIndex
  const [speed, setSpeed] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const speedRef = useRef(speed);

  useEffect(() => {
    generateNewArray();
  }, [arrayLength]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

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
      alert("sorting is in progress");
      return;
    }
    setArray(generateArray());
  };

  const resetColors = () => {
    setRed(-1);
    setGreen(-1);
    setYellow(-1);
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      setRed(i);
      setYellow(i);

      for (let j = i + 1; j < arr.length; j++) {
        setGreen(j);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setYellow(j);
        }

        await sleep(getDelay());
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await sleep(getDelay());
      }
    }

    setSorting(false);
    resetColors();
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCustomInput = () => {
    if (sorting) return;

    try {
      const values = customInput
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num !== "")
        .map((num) => Number(num));

      if(values.length === 0){
        alert("Please enter a valid numbers");
        return;
      }
      if(values.some(isNaN)){
        alert("Invalid input! only numbers are allowed");
        return;
      }
      if(values.length>15){
        alert("upto 15 length is allowed");
        return;
      }
      if(values.some((v)=> v<1 || v>100)){
        alert("keep values between 1 to 100");
        return;
      }


      setArray(values);
      // setArrayLength(values.length);
      resetColors();
      setPopupOpen(false);
      setCustomInput("");
    } catch (err) {
      alert("Something went wrong");
      console.log(err)
    }
  };

  return (
    <>
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

        <div className="flex items-center flex-col mb-9">
          <h1 className="text-3xl font-bold">
            <span className="text-green-300">Selection</span>{" "}
            <span className="text-green-400">Sort</span>{" "}
            <span className="text-green-500">Visualizer</span>
          </h1>
          {sorting && (
            <h2 className="mt-3 mb-3 text-green-500">
              Performing selection sort...
            </h2>
          )}
        </div>

        <div className="flex items-end gap-1 h-80 mb-6">
          {array.map((value, index) => {
            let color = "bg-blue-500";

            if (index === red) {
              color = "bg-red-500";
            } else if (index === green) {
              color = "bg-green-500";
            } else if (index === yellow) {
              color = "bg-yellow-500";
            }
            return (
              <div
                key={index}
                className={`${color} w-15 mx-2 flex justify-center  ${value>=7 ? "text-lg pt-1":"text-xs "} `}
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
                ? "bg-gray-500 cursor-not-allowed "
                : "bg-purple-500 rounded hover:bg-purple-600 cursor-pointer"
            } `}
          >
            {sorting ? "Running..." : "Start Sorting"}
          </button>
        </div>

        <div className="flex gap-7">
          {/* speed and length */}
          <div className="flex flex-col gap-3">
            {/* length */}
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
            {/* speed */}
            <div className="flex gap-4 mb-5">
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
          {/* custom array logic */}
          <div>
            <button
              onClick={() => setPopupOpen(true)}
              className="bg-gray-300 hover:bg-gray-500 rounded-2xl py-1 px-3 text-black "
            >
              Custom Array
            </button>

            {/* popup window for array input */}
            {popupOpen && (
              <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Enter Custom Array</h2>

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
    </>
  );
}
