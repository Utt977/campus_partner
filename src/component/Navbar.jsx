import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
import { FaHome, FaComments, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300">
      {/* Left Side - Logo */}
      <div className="flex-1 justify-center md:justify-start">
        {/* <Link to="/" className="btn btn-ghost text-xl font-semibold text-primary"> */}
        <Link to="/" className='text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          CampusPartner
        </Link>
      </div>

      {user && (
        /* Right Side - Navigation */
        <div className="flex-none gap-4 items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <p className="text-lg font-medium">Welcome, {user.firstName}</p>
            
            <Link to="/" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaHome /> Home
            </Link>
            
            <Link to="/connections" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaComments /> Chats
            </Link>
            
            <Link to="/requests" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaBell /> Requests
            </Link>

            <button 
              onClick={handleLogout} 
              className="btn btn-ghost hover:bg-danger hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>

            {/* Profile Circle */}
            <Link 
              to="/profile" 
              className="avatar hover:opacity-80 transition-opacity"
            >
              <div className="w-10 rounded-full ring-2 ring-primary">
                <img 
                  src={user.photoUrl} 
                  alt="User profile" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Mobile Navigation - Unchanged */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-300 border-t z-50">
            <div className="flex justify-around p-2">
              <button 
                onClick={() => navigate('/')} 
                className="flex flex-col items-center text-primary"
              >
                <FaHome className="text-xl" />
                <span className="text-xs">Home</span>
              </button>
              
              <button 
                onClick={() => navigate('/connections')} 
                className="flex flex-col items-center text-primary"
              >
                <FaComments className="text-xl" />
                <span className="text-xs">Chats</span>
              </button>
              
              <button 
                onClick={() => navigate('/requests')} 
                className="flex flex-col items-center text-primary"
              >
                <FaBell className="text-xl" />
                <span className="text-xs">Requests</span>
              </button>
              
              <button 
                onClick={() => navigate('/profile')} 
                className="flex flex-col items-center text-primary"
              >
                <FaUser className="text-xl" />
                <span className="text-xs">Profile</span>
              </button>
              
              <button 
                onClick={handleLogout} 
                className="flex flex-col items-center text-error"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="text-xs">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;