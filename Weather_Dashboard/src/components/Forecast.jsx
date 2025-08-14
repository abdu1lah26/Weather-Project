import React from "react";

// Helper to get unique days
const getDailyForecast = (list) => {
  const daily = [];
  const seen = new Set();
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!seen.has(date)) {
      daily.push(item);
      seen.add(date);
    }
  });
  return daily;
};

export default function Forecast({ data }) {
  const dailyForecast = getDailyForecast(data);

  return (
    <div className="flex justify-center gap-4 pb-4 flex-wrap sm:flex-nowrap">
      {dailyForecast.map((item) => (
        <div
          key={item.dt}
          className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md
                     rounded-2xl p-4 flex-1 min-w-[120px] text-center
                     shadow-2xl transform transition-transform duration-300
                     hover:scale-105 hover:shadow-xl"
        >
          <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {item.dt_txt.split(" ")[0]}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            className="mx-auto mb-2"
          />
          <p className="text-2xl font-bold text-transparent bg-clip-text 
                        bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">
            {Math.round(item.main.temp)}°C
          </p>
          <p className="capitalize text-gray-700 dark:text-gray-300">
            {item.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
}
