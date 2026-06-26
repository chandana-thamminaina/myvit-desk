import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="logo-box" onClick={toggleSidebar}>
        <img src={logo} alt="logo" />
      </div>

      <nav>
        <Link to="/">
          <span>🏠︎</span>
          {isOpen && " Dashboard"}
        </Link>

        <Link to="/assignments">
          <span>🖳</span>
          {isOpen && " Assignments"}
        </Link>

        <Link to="/notes">
          <span>🗐</span>
          {isOpen && " Notes"}
        </Link>

        <Link to="/focus">
          <span>⏱</span>
          {isOpen && " Focus"}
        </Link>

        <Link to="/marks">
          <span>🕮</span>
          {isOpen && " Marks"}
        </Link>

        <Link to="/planner">
          <span>🗓</span>
          {isOpen && " Planner"}
        </Link>

        <Link to="/exams">
          <span>✍︎</span>
          {isOpen && " Exams"}
        </Link>
      </nav>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("myvitUser");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}
