import React, { useState, useRef, useEffect } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Start or stop the stopwatch
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  // Reset stopwatch
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  // Record a lap
  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [elapsedTime, ...prevLaps]);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time (MM:SS:MS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <>
      <h1 className="title"><i>Stopwatch</i></h1>
      <div className="stopwatch-card">
        <div className="time-display">{formatTime(elapsedTime)}</div>

        <div className="buttons">
          <button
            className={`btn ${isRunning ? "stop" : "start"}`}
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="btn lap" onClick={handleLap} disabled={!isRunning}>
            Lap
          </button>
          <button className="btn reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="laps">
            <h3>Laps</h3>
            <ul>
              {laps.map((lap, index) => (
                <li key={index}>
                  <span>#{laps.length - index}</span>
                  <span>{formatTime(lap)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Stopwatch;