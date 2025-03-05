import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaSignInAlt, FaTimes } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: ''
  });
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm 
        ? { emailId: formData.emailId, password: formData.password }
        : formData;

      const res = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true
      });
      
      dispatch(addUser(isLoginForm ? res.data : res.data.data));
      navigate(isLoginForm ? "/" : "/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong!");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-900 p-4">
      <motion.div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <FaSignInAlt className="w-8 h-8" />
            <span className="bg-white/10 px-4 py-2 rounded-full">
              {isLoginForm ? "Welcome Back!" : "Create Account"}
            </span>
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginForm && (
              <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div className="form-group">
                  <label className="flex items-center gap-2 text-gray-800 mb-2 font-semibold">
                    <FaUser className="text-blue-600 w-5 h-5" />
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                      text-gray-900 placeholder-gray-400
                      transition-all shadow-sm"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="flex items-center gap-2 text-gray-800 mb-2 font-semibold">
                    <FaUser className="text-blue-600 w-5 h-5" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                      text-gray-900 placeholder-gray-400
                      transition-all shadow-sm"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Common Fields */}
            <div className="form-group">
              <label className="flex items-center gap-2 text-gray-800 mb-2 font-semibold">
                <FaEnvelope className="text-blue-600 w-5 h-5" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                  text-gray-900 placeholder-gray-400
                  transition-all shadow-sm"
                placeholder="john@example.com"
                value={formData.emailId}
                onChange={(e) => setFormData({...formData, emailId: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2 text-gray-800 mb-2 font-semibold">
                <FaLock className="text-blue-600 w-5 h-5" />
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                  text-gray-900 placeholder-gray-400
                  transition-all shadow-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 
                border-2 border-red-100">
                <FaTimes className="flex-shrink-0 text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 
                text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 
                transition-all shadow-lg hover:shadow-xl"
            >
              {isLoginForm ? "Login" : "Create Account"}
              <FaArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="text-center text-gray-600">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="ml-2 text-blue-600 font-semibold hover:text-blue-700 
                underline underline-offset-4 transition-colors"
            >
              {isLoginForm ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;