import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleUserSignUp(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      alert("Signup successful");
      navigate("/signin");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUserSignUp}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-accent text-white p-3 rounded-lg uppercase hover:opacity-90 cursor-pointer transition-all"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
