import React from "react";

export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-2xl rounded-2xl p-6 w-80 text-center transform transition-transform duration-300 hover:scale-105">
  <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl font-semibold">{Math.round(main.temp)}°C</p>
      <p className="capitalize">{weather[0].description}</p>
      <div className="flex justify-around mt-4 text-gray-700 dark:text-gray-300">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
</div>

  );
}
