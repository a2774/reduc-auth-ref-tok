import React from "react";
// import UserDetails from "./page/userDetails";
import UserDetails from "./page/user/userDetails.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./navbar/navbar";
import Navbar from "./components/navbar/navbar.jsx";

import Signup from "./page/user/signup.jsx";
// import Login from "./page/login";
import Login from "./page/user/login.jsx";
// import Product from "./page/product";
import Product from "./page/product/product.jsx";
// import ProductCategories from "./page/productCategories";
import ProductCategories from "./page/product/productCategories.jsx";
// import Home from "./page/home";
import Home from "./page/home/home.jsx";
// import Profile from "./page/Profile";
import Profile from "./page/user/Profile.jsx";
// import ProtectedRoute from "./page/ProtectedRoute";
import ProtectedRoute from "./components/routes/RequireAuth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
