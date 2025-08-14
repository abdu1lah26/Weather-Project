import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import Favorites from "./components/Favorites";
import ThemeToggle from "./components/ThemeToggle";

const API_KEY = "599225977ef5f5a469ec61eb5fa66274"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);

    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("theme", theme);
  }, [favorites, theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleSearch = async (city) => {
    try {
      setError("");
      const weatherRes = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastRes.data.list);
    } catch (err) {
      console.error(err);
      setError("City not found");
      setWeatherData(null);
      setForecastData([]);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) setFavorites([...favorites, city]);
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((c) => c !== city));
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className="min-h-screen flex flex-col items-center
                 px-6 sm:px-12 lg:px-24 py-8 sm:py-12
                 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
                 text-gray-900 dark:text-gray-100 transition-colors duration-700"
    >
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-12 max-w-7xl">
        <h1
          className="font-extrabold text-transparent bg-clip-text
                     bg-gradient-to-r from-yellow-400 to-orange-500
                     drop-shadow-lg animate-pulse text-center sm:text-left
                     text-[clamp(2.5rem,8vw,6rem)]"
        >
          Weather Dashboard
        </h1>
        <div className="mt-4 sm:mt-0">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Search */}
      <div className="w-full max-w-md animate-fadeIn mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <p className="text-red-500 mt-2 animate-fadeIn text-center text-lg sm:text-xl">
          {error}
        </p>
      )}

      {/* Weather */}
      {weatherData && (
        <div className="mt-6 flex flex-col items-center gap-6 animate-fadeIn w-full">
          <WeatherCard data={weatherData} />
          <button
            onClick={() => addFavorite(weatherData.name)}
            className="bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-full
                       hover:bg-green-600 dark:hover:bg-green-700
                       shadow-md hover:shadow-lg transition-all duration-300
                       transform hover:scale-105 animate-bounce text-[clamp(1rem,2vw,1.25rem)]"
          >
            Add to Favorites
          </button>
        </div>
      )}

      {/* Forecast */}
      {forecastData.length > 0 && (
        <div className="mt-8 w-full max-w-7xl animate-fadeIn">
          <Forecast data={forecastData} />
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mt-10 w-full max-w-5xl animate-fadeIn">
          <Favorites
            favorites={favorites}
            onClick={handleSearch}
            onRemove={removeFavorite}
          />
        </div>
      )}
    </div>
  );
}
