import { useState } from "react";
import examData from "../data/examsData";

export default function Exams() {
  const [openExam, setOpenExam] = useState(null);

  const getDaysLeft = (date) => {
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Completed";
    if (diffDays === 0) return "Today";
    return `${diffDays} revision days left`;
  };

  const grouped = {
    "CAT 1": examData.filter((item) => item.type === "CAT 1"),
    "CAT 2": examData.filter((item) => item.type === "CAT 2"),
    FAT: examData.filter(
      (item) => item.type === "FAT" || item.type === "Lab FAT"
    ),
  };

  return (
    <div>
      <h1 className="page-title">Exam Countdown</h1>
      <p className="page-subtitle">Track CAT 1, CAT 2 and FAT revision days</p>

      {Object.entries(grouped).map(([section, exams]) => (
        <div key={section} className="exam-group">
          <h2 className="exam-group-title">{section}</h2>

          {exams.map((exam, index) => {
            const uniqueKey = `${section}-${index}`;

            return (
              <div key={uniqueKey} className="exam-item">
                <button
                  className="exam-header"
                  onClick={() =>
                    setOpenExam(openExam === uniqueKey ? null : uniqueKey)
                  }
                >
                  {exam.subject}
                </button>

                {openExam === uniqueKey && (
                  <div className="exam-dropdown">
                    <p>
                      <strong>Date:</strong> {exam.date}
                    </p>
                    <p>
                      <strong>Status:</strong> {getDaysLeft(exam.date)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
