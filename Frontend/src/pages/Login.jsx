import { useState } from "react";
import API from "../services/api";

export default function Login({ switchToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
        user_type: role
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // later we will redirect to dashboard

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Invalid credentials"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-card">

      <h3 className="text-center mb-2">
        Login
      </h3>

      <p className="text-center text-muted mb-4">
        Access your MedTech account
      </p>

      <form onSubmit={handleLogin}>

        {/* EMAIL */}
        <div className="mb-3">

          <label className="form-label">
            Email Address
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-3">

          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

        </div>

        {/* ROLE */}
        <div className="mb-3">

          <label className="form-label">
            Login As
          </label>

          <select
            className="form-select"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="PATIENT">Patient</option>
            <option value="CONSULTANT">Consultant</option>
            <option value="ADMIN">Admin</option>
          </select>

        </div>

        {/* BUTTON */}
        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* LINKS */}

      <div className="text-center mt-3">

        <a href="#">
          Forgot Password?
        </a>

        <p className="mt-2">

          Don't have an account?{" "}

          <span
            className="link-btn"
            onClick={switchToRegister}
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );
}