import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Wind,
} from "lucide-react";
import "../styles/ForecastCard.css";

export default function ForecastCard({ date, temp, description, unit }) {
  // Convert timestamp to weekday
  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  // Pick an icon based on weather description
  function getWeatherIcon(desc) {
    const d = desc.toLowerCase();
    if (d.includes("cloud")) return <Cloud size={32} color="#3b82f6" />;
    if (d.includes("rain")) return <CloudRain size={32} color="#3b82f6" />;
    if (d.includes("snow")) return <Snowflake size={32} color="#60a5fa" />;
    if (d.includes("thunder"))
      return <CloudLightning size={32} color="#2563eb" />;
    if (d.includes("clear")) return <Sun size={32} color="#facc15" />;
    return <Wind size={32} color="#6b7280" />;
  }

  return (
    <div className="forecast-card">
      <p className="day">{weekday}</p>
      {getWeatherIcon(description)}
      <p className="temp">
        {Math.round(temp)}°{unit === "metric" ? "C" : "F"}
      </p>

      <p className="desc">{description}</p>
    </div>
  );
}
