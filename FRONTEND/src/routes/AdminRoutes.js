import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout"; 
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile"; 
import ManageItems from "../pages/ManageItems";
import ManageBookings from "../pages/ManageBookings";
import Payments from "../pages/Payments";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute"; 

// Route configuration for all admin pages
const routeConfig = [
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },
  { path: "/items", component: ManageItems },
  { path: "/bookings", component: ManageBookings },
  { path: "/payments", component: Payments },
  { path: "/reports", component: Reports },
  { path: "/settings", component: Settings },
];

const AdminRoutes = () => {
  return (
    <Routes>
      {routeConfig.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute isAuthenticated={true}>
              <AdminLayout>
                {React.createElement(component)}  {/* Dynamically render the component */}
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default AdminRoutes;
