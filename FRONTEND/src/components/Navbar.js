// src/components/Navbar.js

import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-white"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Logo or Brand */}
      <div className="text-xl font-semibold">Admin Panel</div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User Profile"
          className="rounded-full"
        />
        <button className="bg-gray-700 p-2 rounded-md text-white">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
