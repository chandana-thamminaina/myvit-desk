import { useState } from "react";
import assignmentsData from "../data/assignmentsData";

export default function Assignments() {
  const [openSubject, setOpenSubject] = useState(null);

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Done";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const sortedAssignments = [...assignmentsData].sort(
    (a, b) => new Date(a.due) - new Date(b.due)
  );

  const upcomingAssignments = sortedAssignments.slice(0, 4);

  const groupedAssignments = sortedAssignments.reduce((acc, item) => {
    if (!acc[item.subject]) acc[item.subject] = [];
    acc[item.subject].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="page-title">Assignments Timeline</h1>
      <p className="page-subtitle">
        Track upcoming submissions and stay ahead of deadlines
      </p>

      <h2 className="section-title">Upcoming Due</h2>
      <div className="upcoming-grid">
        {upcomingAssignments.map((item, index) => (
          <div className="card assignment-card" key={index}>
            <h3>{item.subject}</h3>
            <p>{item.title}</p>
            <p>{getDaysLeft(item.due)}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">All Assignments</h2>
      <div className="subject-accordion">
        {Object.keys(groupedAssignments).map((subject) => (
          <div className="card subject-card" key={subject}>
            <div
              className="subject-header"
              onClick={() =>
                setOpenSubject(openSubject === subject ? null : subject)
              }
            >
              <h3>{subject}</h3>
              <span>{openSubject === subject ? "−" : "+"}</span>
            </div>

            {openSubject === subject && (
              <div className="subject-dropdown">
                {groupedAssignments[subject].map((item, index) => (
                  <div className="assignment-row" key={index}>
                    <span>{item.title}</span>
                    <span>
                      {item.due} • {getDaysLeft(item.due)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
