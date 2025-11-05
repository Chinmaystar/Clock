import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Update the timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) audioRef.current.play(); // Ring sound 🔔
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft]);

  // Convert minutes + seconds to total seconds
  const handleStart = () => {
    const total = parseInt(minutes) * 60 + parseInt(seconds);
    if (total > 0) {
      setTimeLeft(total);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearTimeout(timerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearTimeout(timerRef.current);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
  };

  // Format display time (MM:SS)
  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <>
    <h1 className="title"><i>Timer</i></h1>
    <div className="timer-card">

      <div className="time-display">
        {timeLeft > 0 ? formatTime(timeLeft) : formatTime(minutes * 60 + seconds)}
      </div>

      <div className="inputs">
        <input
          type="number"
          min="0"
          max="59"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          disabled={isRunning}
        />
        <span>:</span>
        <input
          type="number"
          min="0"
          max="59"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          disabled={isRunning}
        />
      </div>

      <div className="buttons">
        {!isRunning ? (
          <button className="btn start" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="btn stop" onClick={handleStop}>
            Stop
          </button>
        )}
        <button className="btn reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <audio ref={audioRef}>
        <source
          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
    </>
  );
}

export default Timer;