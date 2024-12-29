import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/items">Manage Items</Link>
        </li>
        <li>
          <Link to="/admin/bookings">Manage Bookings</Link>
        </li>
        <li>
          <Link to="/admin/customers">Manage Customers</Link>
        </li>
        <li>
          <Link to="/admin/payments">Payments</Link>
        </li>
        <li>
          <Link to="/admin/reports">Reports</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
