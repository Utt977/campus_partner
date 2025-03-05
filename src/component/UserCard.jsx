import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';
import { FaTimes, FaHeart, FaBirthdayCake, FaTransgender, FaUniversity, FaStar } from 'react-icons/fa';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills, college } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error('Request Error:', err.response?.data || err.message);
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-sm mx-4 sm:mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 mb-16 "
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Profile Image Section */}
      <div className="relative h-72 w-full"> 
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-contain object-center" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-100">
            {firstName} {lastName}
          </h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {age && (
              <span className="flex items-center gap-2">
                <FaBirthdayCake className="text-purple-400" />
                {age} years
              </span>
            )}
            {gender && (
              <span className="flex items-center gap-2">
                <FaTransgender className="text-blue-400" />
                {gender}
              </span>
            )}
          </div>
        </div>

        {/* College */}
        {college && (
          <div className="flex items-center gap-2 text-gray-400">
            <FaUniversity className="text-green-400 flex-shrink-0" />
            <span className="truncate">{college}</span>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <FaStar className="text-yellow-400" />
              Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-700 text-gray-100 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        {about && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <motion.button
            onClick={() => handleSendRequest('ignored', _id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-red-400 rounded-lg transition-colors"
          >
            <FaTimes className="text-lg" />
            Pass
          </motion.button>

          <motion.button
            onClick={() => handleSendRequest('interested', _id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            <FaHeart className="text-lg" />
            Connect
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;