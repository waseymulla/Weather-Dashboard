import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import "./styles/App.css";

export default function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric"); // "metric" (°C) or "imperial" (°F)
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  async function handleSearch(cityName, newUnit = unit) {
    try {
      setError("");
      setLoading(true);
      setCity(cityName);

      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${newUnit}`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weather = await weatherRes.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${newUnit}`
      );
      if (!forecastRes.ok) throw new Error("Forecast not found");
      const forecast = await forecastRes.json();
      setForecastData(forecast);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unit={unit}
        setUnit={setUnit}
        city={city}
        onSearch={handleSearch}
      />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}
        {weatherData && <CurrentWeather data={weatherData} unit={unit} />}
        {forecastData && <ForecastList data={forecastData} unit={unit} />}
      </main>
    </div>
  );
}
