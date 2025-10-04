import React, { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar(props) {
  const [city, setCity] = useState("");

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!city.trim()) return;
    props.onSearch(city);
  }

  return (
    <section className="search-section">
      <h1>Check the weather anywhere!</h1>
      <p>Search by city to view real-time conditions and 5-day forecast</p>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          value={city}
          placeholder="Enter city name..."
          onChange={handleChange}
          disabled={props.loading}
        />
        <button className="search-button" disabled={props.loading}>
          {props.loading ? "Searching..." : "Search"}
        </button>
      </form>
    </section>
  );
}
