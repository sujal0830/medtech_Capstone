import { useState } from "react";
import API from "../services/api";

export default function Register({ switchToLogin }) {

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: "PATIENT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // 🔒 password match validation
    if (form.password !== form.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await API.post("/auth/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        user_type: form.user_type
      });

      console.log(response.data);

      alert("Registered Successfully");

      switchToLogin();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (

    <div className="auth-card">

      <h3 className="text-center mb-3">
        Create Account
      </h3>

      <form onSubmit={handleSubmit}>

        {/* FULL NAME */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>

          <input
            name="full_name"
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label className="form-label">Password</label>

          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>

          <input
            name="confirm_password"
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
        </div>

        {/* USER TYPE */}
        <div className="mb-3">
          <label className="form-label">User Type</label>

          <select
            name="user_type"
            className="form-select"
            onChange={handleChange}
            value={form.user_type}
          >
            <option value="PATIENT">Patient</option>
            <option value="CONSULTANT">Consultant</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>

      </form>

      <p className="text-center mt-3">

        Already have an account?{" "}

        <span
          className="link-btn"
          onClick={switchToLogin}
        >
          Login
        </span>

      </p>

    </div>
  );
}