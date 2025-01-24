import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills, college } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };

  return (
    <div className="relative p-[4px] group w-72 sm:w-80 md:w-72 lg:w-72 w-[90%] sm:w-80 shadow-xl min-h-[300px]">
      {/* Animated Background */}
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundSize: '400% 400%',
        }}
        className="absolute inset-0 rounded-xl z-[-1] opacity-60 blur-xl transition duration-500 will-change-transform bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
      />

      {/* Card Content */}
      <div className="relative bg-base-300 rounded-xl">
        <figure className="w-full aspect-w-16 aspect-h-10">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover rounded-t-xl"
          />
        </figure>
        <div className="p-3">
          <h2 className="text-lg font-bold">{`${firstName} ${lastName}`}</h2>

          {age && gender && <p className="text-sm">{`${age}, ${gender}`}</p>}

          {college && (
            <p className="mt-2 text-sm font-semibold">
              {college}
            </p>
          )}

          {skills && skills.length > 0 && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold">Skills</h3>
              <ul className="flex flex-wrap gap-1 mt-2">
                {skills.map((skill, index) => (
                  <li key={index} className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-2 text-sm">{about}</p>

          <div className="card-actions justify-center my-3 gap-4">
            {/* Ignore Button */}
            <button
              onClick={() => handleSendRequest('ignored', _id)}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-400 text-white rounded-full text-sm font-medium"
            >
              Ignore
            </button>

            {/* Interested Button */}
            <button
              onClick={() => handleSendRequest('interested', _id)}
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-400 text-white rounded-full text-sm font-medium"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
