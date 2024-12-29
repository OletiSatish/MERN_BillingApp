import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import Login from "../pages/Login";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(""); // Default role is empty

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login onLogin={setIsAuthenticated} setUserRole={setUserRole} />} />

        {/* Conditional Routing Based on Role */}
        {isAuthenticated && userRole === "admin" && (
          <Route path="/*" element={<AdminRoutes />} />
        )}
        {isAuthenticated && userRole === "customer" && (
          <Route path="/*" element={<UserRoutes />} />
        )}

        {/* Redirect to login for unauthenticated users */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
