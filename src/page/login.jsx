import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../feature/user/userSlice.js'
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password
      })
    );

   
    if (result.payload && !result.error) {
      toast.success("Login successful!");
      navigate("/");
    } 

    else if (result.payload) {
      toast.error(result.payload); 
    }

  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center justify-center">
          
          <div className="w-full max-w-md mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
              
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-purple-300">Login to your account</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

               
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-2">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      errors.email ? 'border-red-500' : 'border-purple-500/30 hover:border-purple-500/60'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

          
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-purple-500/30 hover:border-purple-500/60'
                    }`}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="flex justify-end">
                  <Link to="#" className="text-purple-400 hover:text-pink-400 text-sm font-semibold transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors">Sign up here</Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-500/30">
                <p className="text-xs text-slate-400 text-center">Demo Credentials:</p>
                <p className="text-xs text-slate-500 text-center">Email: <span className="text-purple-400">emilys@example.com</span></p>
                <p className="text-xs text-slate-500 text-center">Password: <span className="text-purple-400">emilyspass</span></p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
