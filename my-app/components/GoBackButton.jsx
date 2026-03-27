import Link from "next/link";
import React from "react";

const GoBackButton = ({ destination }) => {
  return (
    <div className="absolute top-4  left-4">
      <Link
        href={destination}
        className="fixed px-3 py-2 bg-gray-700 rounded hover:bg-gray-800 transition-colors"
      >
        ⬅️ Go Back
      </Link>
    </div>
  );
};

export default GoBackButton;
