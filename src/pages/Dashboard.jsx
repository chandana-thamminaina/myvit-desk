import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("myvitUser"));

  const cards = [
    {
      title: "Upcoming Assignments",
      desc: "Track the closest deadlines and stay ahead",
      path: "/assignments",
    },
    {
      title: "Today's Planner",
      desc: "See your quizzes, DAs, and tasks for the day",
      path: "/planner",
    },
    {
      title: "Marks Safety",
      desc: "Predict FAT marks required for your targets",
      path: "/marks",
    },
    {
      title: "Exam Countdown",
      desc: "Know revision days left for CATs and FAT",
      path: "/exams",
    },
  ];

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Welcome back, {user?.fullName || "Student"} ({user?.regNo || "Reg No"})
      </p>

      <div className="dashboard-top-grid">
        {cards.map((item, index) => (
          <div
            className="card dashboard-click-card"
            key={index}
            onClick={() => navigate(item.path)}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
