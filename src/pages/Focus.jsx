import { useState, useEffect } from "react";

export default function Focus() {
  const [selectedTime, setSelectedTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("");

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(selectedTime * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, selectedTime]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime * 60);
  };

  const handleTimeChange = (e) => {
    const value = Number(e.target.value);
    setSelectedTime(value);
    setTimeLeft(value * 60);
    setIsRunning(false);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div>
      <h1 className="page-title">Focus Mode</h1>
      <p className="page-subtitle">
        A distraction-free deep work space for study sessions
      </p>

      <div className="focus-card">
        <select
          className="focus-time-select"
          value={selectedTime}
          onChange={handleTimeChange}
        >
          <option value={15}>15 Minutes</option>
          <option value={25}>25 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>60 Minutes</option>
        </select>

        <h2 className="timer-text">
          {minutes}:{seconds}
        </h2>

        <input
          className="focus-input"
          type="text"
          placeholder="What are you focusing on?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div className="focus-buttons">
          <button className="primary-btn" onClick={() => setIsRunning(true)}>
            Start
          </button>

          <button className="primary-btn" onClick={() => setIsRunning(false)}>
            Pause
          </button>

          <button className="primary-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
