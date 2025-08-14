import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity(""); // clear input after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevents page refresh
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 
                    bg-white/30 dark:bg-gray-800/30 backdrop-blur-md 
                    rounded-2xl shadow-2xl w-full max-w-md
                    transform transition-all duration-300 hover:scale-105">
      <input
        type="text"
        value={city}
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 rounded-xl outline-none border border-gray-300 dark:border-gray-600
                   bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-300
                   focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleSearch}
        className="px-5 py-2 rounded-xl font-semibold text-white
                   bg-gradient-to-r from-blue-500 to-indigo-600
                   shadow-lg hover:from-blue-600 hover:to-indigo-700
                   transition-all duration-300 transform hover:scale-105"
      >
        Search
      </button>
    </div>
  );
}
