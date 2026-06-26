import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login-bg.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    regNo: "",
    password: "",
  });

  const handleLogin = () => {
    if (!form.fullName || !form.email || !form.regNo || !form.password) {
      alert("Please fill all details");
      return;
    }

    localStorage.setItem("myvitUser", JSON.stringify(form));
    window.location.href = "/";
  };

  return (
    <div className="login-shell" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="login-right-panel">
        <div className="login-form-card">
          <h2>MyVIT Desk</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Registration Number"
            value={form.regNo}
            onChange={(e) => setForm({ ...form, regNo: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
