import "./styles.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Notes from "./pages/Notes";
import Focus from "./pages/Focus";
import Marks from "./pages/Marks";
import Planner from "./pages/Planner";
import Exams from "./pages/Exams";
import Login from "./pages/Login";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("myvitUser"));

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
