import React from "react";
import "../styles/Header.css";

export default function Header({ darkMode, setDarkMode, unit, setUnit, city, onSearch }) {
  function handleUnitChange(newUnit) {
    if (newUnit !== unit) {
      setUnit(newUnit);
      if (city) onSearch(city, newUnit); // refetch data in new unit if city exists
    }
  }

  return (
    <nav className="header">
      <h1>Weather App</h1>

      <div className="header-buttons">
        {/* °C / °F Toggle */}
        <div className="unit-toggle">
          <button
            className={unit === "imperial" ? "active" : ""}
            onClick={() => handleUnitChange("imperial")}
          >
            °F
          </button>
          <button
            className={unit === "metric" ? "active" : ""}
            onClick={() => handleUnitChange("metric")}
          >
            °C
          </button>
        </div>

        {/* Dark Mode */}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}
