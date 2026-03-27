import { MonitorCog } from "lucide-react";
import Link from "next/link";
import React from "react";

const Card = ({ name, destination, photo }) => {
  return (
    <Link
      href={destination}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl w-32 h-40 md:w-84 md:h-80 flex flex-col"
    >
      
      <div className="h-1/2">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="h-1/2 flex items-center justify-center p-2 bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 font-semibold ">
        <div className="flex gap-3 justify-center items-center">
          <span className="text-xl">{name}</span>
           <span className="text-purple-900">
            <MonitorCog/>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;