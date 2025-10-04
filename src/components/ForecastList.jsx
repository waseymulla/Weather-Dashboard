import React from "react";
import ForecastCard from "./ForecastCard";
import "../styles/ForecastList.css";

export default function ForecastList(props) {
  if (props.loading) return <p className="loading">Loading 5-day forecast...</p>;
  if (props.error) return <p className="error">{error}</p>;
  if (!props.data || !props.data.list) return null;

  // Extract one forecast per day (the 12:00:00 entries)
  const dailyForecasts = props.data.list.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <section className="forecast-list">
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {dailyForecasts.map((item) => (
          <ForecastCard
            key={item.dt}
            date={item.dt_txt}
            temp={item.main.temp}
            description={item.weather[0].description}
          />
        ))}
      </div>
    </section>
  );
}
