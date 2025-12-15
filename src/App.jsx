import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { decodeJWT } from "./shared/jwtUtils";

import UserDetails from "./pages/user/UserDetails.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./shared/components/navbar/navbar.jsx";

import Signup from "./pages/auth/Signup.jsx";

import Login from "./pages/auth/Login.jsx";

import Product from "./pages/product/product.jsx";

import ProductCategories from "./pages/product/productCategories.jsx";

import Home from "./pages/home/Home.jsx";

import Profile from "./pages/user/Profile.jsx";

import ProtectedRoute from "./routes/RequireAuth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (refreshToken) {
      const decoded = decodeJWT(refreshToken);
      if (decoded && decoded.exp) {
        const expiresIn = decoded.exp * 1000 - Date.now();

        if (expiresIn <= 0) {
          dispatch(logout());
        } else {
          const timer = setTimeout(() => {
            dispatch(logout());
          }, expiresIn);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [refreshToken, dispatch]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productCategories"
            element={
              <ProtectedRoute>
                <ProductCategories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
                  <div className="max-w-7xl mx-auto text-center pt-20">
                    <h1 className="text-5xl font-bold text-white mb-4">
                      Settings Page
                    </h1>
                    <p className="text-purple-300 text-lg">
                      Manage your preferences
                    </p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
