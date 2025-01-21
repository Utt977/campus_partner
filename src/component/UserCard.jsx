import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { BASE_URL } from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useSpring, animated } from 'react-spring'; // Import react-spring

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills, college } = user;

  const [swipeDirection, setSwipeDirection] = useState(null);

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

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      handleSendRequest('interested', _id);
      setSwipeDirection('up'); // Set swipe direction for feedback
    },
    onSwipedDown: () => {
      handleSendRequest('ignored', _id);
      setSwipeDirection('down'); // Set swipe direction for feedback
    },
    preventScrollOnSwipe: true,
    delta: 50,
  });

  // Spring animation for the swipe direction feedback
  const [props, set] = useSpring(() => ({ opacity: 0 }));

  // Change animation opacity and direction when swipe happens
  if (swipeDirection) {
    set({ opacity: 1 });
    setTimeout(() => set({ opacity: 0 }), 500); // Fade feedback after some time
  }

  return (
    <div
      className="card bg-base-300 w-96 shadow-xl min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
      {...swipeHandlers} // Attach swipe handlers to the card
    >
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        
        {age && gender && <p>{age + ', ' + gender}</p>}

        {/* Show College */}
        {college && (
          <p className="mt-2 text-sm font-semibold">
            {college}
          </p>
        )}

        {/* Skills Field */}
        {skills && skills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <li key={index} className="px-4 py-1 bg-indigo-500 text-white rounded-full text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p>{about}</p>

        {/* Swipe feedback animation */}
        <animated.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white z-10`}
          style={{ opacity: props.opacity }}
        >
          {swipeDirection === 'up' && (
            <div className="bg-green-500 px-6 py-2 rounded-full text-center">Interested</div>
          )}
          {swipeDirection === 'down' && (
            <div className="bg-red-500 px-6 py-2 rounded-full text-center">Ignored</div>
          )}
        </animated.div>

        <div className="card-actions justify-center my-4 gap-12">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest('ignored', _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
