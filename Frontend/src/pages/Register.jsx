import { useState } from "react";
import API from "../services/api";

export default function Register() {

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
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

    try {
      console.log("Submitting:", form); // ✅ debug

      const response = await API.post(
        "/auth/register",
        form
      );

      console.log(response.data);
      alert("Registered Successfully");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="full_name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <select
        name="user_type"
        onChange={handleChange}
        value={form.user_type}
      >
        <option value="ADMIN">ADMIN</option>
        <option value="PATIENT">PATIENT</option>
        <option value="CONSULTANT">CONSULTANT</option>
      </select>

      {/* ✅ IMPORTANT */}
      <button type="submit">
        Register
      </button>

    </form>
  );
}