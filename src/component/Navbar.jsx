import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-semibold text-primary">Campus Partner</Link>
        </div>
        {user && (
          <div className="flex-none gap-2 justify-center">
            <p className="text-lg font-medium">Welcome, {user.firstName}</p>

            {/* Navbar links for larger screens */}
            <div className="hidden md:flex gap-6 items-center">
              <Link to="/profile" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                Profile
              </Link>
              <Link to="/connections" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                Connections
              </Link>
              <Link to="/requests" className="btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                Requests
              </Link>
              <Link onClick={handleLogout} className="btn btn-ghost hover:bg-danger hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                Logout
              </Link>
            </div>

            {/* Dropdown for smaller screens */}
            <div className="dropdown dropdown-end md:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">Edit</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
