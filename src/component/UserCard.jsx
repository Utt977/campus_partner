import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { BASE_URL } from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

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
    onSwipedUp: () => handleSendRequest('interested', _id),
    onSwipedDown: () => handleSendRequest('ignored', _id),
    preventScrollOnSwipe: true, // Prevent scrolling while swiping
    delta: 50, // Minimum distance for a swipe
  });

  return (
    <div
      className="card bg-base-300 w-96 shadow-xl"
      {...swipeHandlers} // Attach swipe handlers to the card
    >
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + ', ' + gender}</p>}
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
