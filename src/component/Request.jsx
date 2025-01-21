import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 font-bold text-3xl">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-5">Requests</h1>
      <div className="flex flex-col gap-4 items-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center bg-base-300 w-11/12 md:w-3/4 p-4 rounded-lg shadow-lg"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                <img
                  alt="photo"
                  className="w-16 h-16 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              {/* User Details */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="font-bold text-lg text-white">
                  {firstName + ' ' + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300">{`${age}, ${gender}`}</p>
                )}
                <p className="text-sm text-gray-400">{about}</p>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <button
                  className="btn btn-primary text-sm w-full"
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary text-sm w-full"
                  onClick={() => reviewRequest('rejected', request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
