import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { BASE_URL } from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useSpring, animated } from 'react-spring';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills, college } = user;

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSwiped, setIsSwiped] = useState(false);

  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: 1,
    config: { tension: 200, friction: 15 },
  }));

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
      setSwipeDirection('up');
      api.start({ y: -500, opacity: 0 });
      setIsSwiped(true);
    },
    onSwipedDown: () => {
      handleSendRequest('ignored', _id);
      setSwipeDirection('down');
      api.start({ y: 500, opacity: 0 });
      setIsSwiped(true);
    },
    preventScrollOnSwipe: true,
    delta: 50,
  });

  return (
    <animated.div
      className="card bg-base-300 w-96 shadow-xl min-h-[350px] sm:min-h-[400px] md:min-h-[450px] relative"
      {...swipeHandlers} // Attach swipe handlers to the card
      style={springProps}
    >
      <figure>
        <img src={photoUrl} alt="user" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{`${firstName} ${lastName}`}</h2>

        {age && gender && <p className="">{`${age}, ${gender}`}</p>}

        {/* Show College */}
        {college && (
          <p className="mt-2 text-sm font-semibold ">
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

        <p className="mt-3">{about}</p>

        {/* Swipe feedback animation */}
        {!isSwiped && (
          <animated.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white z-10"
          >
            {swipeDirection === 'up' && (
              <div className="bg-green-500 px-6 py-2 rounded-full text-center">Interested</div>
            )}
            {swipeDirection === 'down' && (
              <div className="bg-red-500 px-6 py-2 rounded-full text-center">Ignored</div>
            )}
          </animated.div>
        )}

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
    </animated.div>
  );
};

export default UserCard;
