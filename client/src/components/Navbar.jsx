import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();

  const menuItems = [
    { name: "Search", url: "/" },
    { name: "Add Item", url: "/items/add" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/book.jpg"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <UserProfile />
        ) : (
          <div className="space-x-2">
            <Link to="/register" className="btn btn-soft">Register</Link>
            <Link to="/login" className="btn btn-soft">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
