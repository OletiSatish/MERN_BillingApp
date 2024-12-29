import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div>
      <div className="text-center p-6">
        <h1 className="text-4xl">Welcome</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
