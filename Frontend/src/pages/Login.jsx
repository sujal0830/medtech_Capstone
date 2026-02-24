import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin = async e => {
    e.preventDefault();

    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    alert("Login Success");
  };

  return (
    <form onSubmit={handleLogin}>
      <input onChange={e=>setEmail(e.target.value)} />
      <input type="password"
        onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}