import React from "react";

export default function Favorites({ favorites, onClick, onRemove }) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md
                    rounded-2xl p-6 shadow-2xl transition-all duration-300
                    transform hover:scale-105">
      <h3 className="font-bold text-xl mb-4 text-center text-gray-800 dark:text-gray-100">
        Favorites
      </h3>
      <ul className="flex flex-wrap gap-3 justify-center">
        {favorites.map((city) => (
          <li
            key={city}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-gradient-to-r from-blue-400/30 to-indigo-500/30
                       dark:from-blue-700/40 dark:to-indigo-800/40
                       shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <button
              onClick={() => onClick(city)}
              className="font-semibold text-blue-800 dark:text-blue-300 hover:underline"
            >
              {city}
            </button>
            <button
              onClick={() => onRemove(city)}
              className="text-red-500 dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-600"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
