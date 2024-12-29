import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Billing from "../pages/Billing";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
    </Routes>
  );
};

export default UserRoutes;
