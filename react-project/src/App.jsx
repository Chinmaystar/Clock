import React, { useState } from "react";
import WorldClock from "./WorldClock/WorldClock.jsx"
import Timer from "./Timer/Timer.jsx"
import Stopwatch from "./Stopwatch/Stopwatch.jsx";
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("worldclock");

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <button
          className={activeTab === "timer" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("timer")}>
          Timer
        </button>

        <button
          className={activeTab === "stopwatch" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("stopwatch")}>
          Stopwatch
        </button>

        <button
          className={activeTab === "worldclock" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("worldclock")}
        >
          World Clock
        </button>
      </nav>

      {/* Content */}
      <div className="content">
        {activeTab === "timer" && <Timer />}
        {activeTab === "stopwatch" && <Stopwatch />}
        {activeTab === "worldclock" && <WorldClock />}
      </div>
    </div>
  );
}

export default App;