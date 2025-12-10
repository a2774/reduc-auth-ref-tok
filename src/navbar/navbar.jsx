import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../feature/user/userSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-white font-bold text-2xl hidden sm:inline">
              Redux Auth
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/users"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Users
            </Link>
            <Link
              to="/productCategories"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Product categories
            </Link>
            <Link
              to="/product"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Product
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/singup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  Sign Up
                </Link>
              </>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Logout
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-purple-500/30 pt-4">

            <Link
              to="/"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Home
            </Link>

            <Link
              to="/users"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Users
            </Link>

            <Link
              to="/profile"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Profile
            </Link>

            <Link
              to="/product"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200"
            >
              Product
            </Link>

            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  className="flex-1 px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 border border-purple-500/50 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/singup"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
