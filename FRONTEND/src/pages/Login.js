import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const Login = ({ onLogin, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);

      // Update authentication state and user role
      onLogin(true);  // Set authenticated state to true
      setUserRole(response.data.role); // Set user role based on response

      // Navigate based on user role
      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else if (response.data.role === "customer") {
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800">Sign in</h2>
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-xs text-blue-500 hover:underline block text-right mt-1"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
