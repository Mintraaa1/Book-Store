import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold text-white">
          📚 Book Store
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/add" className="text-white hover:underline">Add Book</Link>
          <Link to="/profile" className="text-white hover:underline">Profile</Link>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg border text-sm bg-white/20 text-white hover:bg-white/30"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
