import { useState, useEffect } from "react";

export default function Planner() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("plannerEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [form, setForm] = useState({
    subject: "",
    subjectType: "Theory",
    taskName: "",
    taskType: "Quiz",
    date: "",
  });

  /* Save events whenever changed */
  useEffect(() => {
    localStorage.setItem("plannerEvents", JSON.stringify(events));
  }, [events]);

  const handleAdd = () => {
    if (!form.subject || !form.taskName || !form.date) return;

    setEvents([...events, form]);

    setForm({
      subject: "",
      subjectType: "Theory",
      taskName: "",
      taskType: "Quiz",
      date: "",
    });
  };

  const handleDelete = (date, indexToDelete) => {
    const updated = events.filter(
      (event, index) =>
        !(
          event.date === date &&
          groupedByDate[date].indexOf(event) === indexToDelete
        )
    );

    setEvents(updated);
  };

  const groupedByDate = events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <div className="planner-page">
      <h1 className="page-title">Academic Planner</h1>
      <p className="page-subtitle">
        Organize quizzes, digital assignments, and tests by date
      </p>

      <div className="planner-bar">
        <input
          className="planner-input"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <select
          className="planner-select"
          value={form.subjectType}
          onChange={(e) => setForm({ ...form, subjectType: e.target.value })}
        >
          <option>Theory</option>
          <option>Lab</option>
        </select>

        <input
          className="planner-input"
          placeholder="Task Name"
          value={form.taskName}
          onChange={(e) => setForm({ ...form, taskName: e.target.value })}
        />

        <select
          className="planner-select"
          value={form.taskType}
          onChange={(e) => setForm({ ...form, taskType: e.target.value })}
        >
          <option>Quiz</option>
          <option>Digital Assignment</option>
          <option>Test</option>
          <option>Other</option>
        </select>

        <input
          className="planner-date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button className="planner-add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="planner-events">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="planner-card empty-card">
            <h3>No academic events yet</h3>
            <p>Add your first quiz, DA, or test above.</p>
          </div>
        ) : (
          Object.keys(groupedByDate)
            .sort()
            .map((date) => (
              <div key={date} className="planner-card">
                <h3 className="planner-date-heading">{date}</h3>

                {groupedByDate[date].map((item, index) => (
                  <div key={index} className="planner-event-item">
                    <div>
                      <strong>{item.subject}</strong> ({item.subjectType}) —{" "}
                      {item.taskName}
                      <span className="planner-tag">{item.taskType}</span>
                    </div>

                    <button
                      className="planner-delete-btn"
                      onClick={() => handleDelete(date, index)}
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
