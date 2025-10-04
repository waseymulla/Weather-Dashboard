import React from "react";
import "../styles/CurrentWeather.css";
import { Droplet, Wind } from "lucide-react";

export default function CurrentWeather({ data, loading, error,unit }) {
  if (loading) return <p className="loading">Loading current weather...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data || !data.main) return null;

  const cityName = `${data.name}, ${data.sys.country}`;
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  return (
    <section className="current-weather">
      <div className="top-section">
        <div className="info">
          <h2 className="city-name">{cityName}</h2>
          <p className="description">{description}</p>
        </div>
      </div>

      <div className="bottom-section">
        <div className="left">
          <h1 className="temperature">
            {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
          </h1>
        </div>

        <div className="right">
          <div className="metric">
            <Droplet size={18} />
            <span>Humidity</span>
            <strong>{humidity}%</strong>
          </div>
          <div className="metric">
            <Wind size={18} />
            <span>Wind</span>
            <strong>{windSpeed} m/s</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
