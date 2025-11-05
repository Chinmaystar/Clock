import React, { useState } from "react";
import Clock from "./Clock.jsx"
import "./WorldClock.css"

function WorldClock() {
    const [country, setCountry] = useState("");
    const [clocks, setClocks] = useState([]);  

  const timezoneData = {
    "india": { zoneName: "IST", timezone: 530 },
    "usa": { zoneName: "EST", timezone: -500 },
    "uk": { zoneName: "GMT", timezone: 0 },
    "japan": { zoneName: "JST", timezone: 900 },
    "australia": { zoneName: "AEST", timezone: 1000 },
  };

  const handleAddClock = (e) => {
    e.preventDefault();
    if (country && timezoneData[country.toLowerCase()]) {
      const key = country.toLowerCase();
      const newClock = {
        id: Date.now(), // unique ID
        country: country.toUpperCase(),
        timezone: timezoneData[key].timezone,
        zoneName: timezoneData[key].zoneName,
      };

      // prevent duplicates
      if (!clocks.some((c) => c.country === newClock.country)) {
        setClocks([...clocks, newClock]);
      }
      setCountry("");
    }
  };

  const handleReset = () => {
    setClocks([]);
  };

  return (
    <div className="app-container">
      <h1 className="title"><i>World Clock</i></h1>

      <form className="clock-form" onSubmit={handleAddClock}>
        <select
          className="dropdown"
          value={country}
          onChange={(e) => setCountry(e.target.value)}>

        <option value="">Select a country</option>
        {Object.keys(timezoneData).map((countryKey) => (
        <option key={countryKey} value={countryKey}>
            {countryKey.charAt(0).toUpperCase() + countryKey.slice(1)}
        </option>
        ))}
        </select>

        <button type="submit" className="submit-btn">
          Add Clock
        </button>

        {clocks.length > 0 && (
          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </form>

        <div className="clocks-container">
        {clocks.map((clock) => (
            <div key={clock.id} className="clock-item">
            <Clock
                timezone={clock.timezone}
                zoneName={clock.zoneName}
                country={clock.country}
            />
            </div>
        ))}
        </div>
    </div>
  );
}

export default WorldClock
