import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  async function handleUserLogout(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        alert("Error logging out");
      }
      localStorage.removeItem("isLoggedIn");
      alert("Logged out successfully");
      navigate("/signin");
    } catch (err) {
      alert(err);
    }
  }
  return (
    <nav className="flex flex-col md:flex-row items-center justify-center md:justify-between px-8 py-4 bg-secondary text-white shadow-md">
      <div className="font-bold text-2xl mb-2 md:mb-0">TEST</div>
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400"
        >
          About
        </Link>
        {localStorage.getItem("isLoggedIn") ? (
          <>
            <Link
              to="/profile"
              className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400"
            >
              Profile
            </Link>
            <a
              className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400 cursor-pointer"
              onClick={handleUserLogout}
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-white no-underline mr-6 text-base transition-colors duration-200 hover:text-blue-400"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
