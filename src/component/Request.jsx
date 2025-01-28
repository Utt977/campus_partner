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
      <h1 className="flex justify-center my-10 font-bold text-3xl text-white">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4 md:px-10">
      <h1 className="font-bold text-white text-3xl mb-6">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, college } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center justify-between gap-4 mb-6 md:mb-4 p-4 rounded-lg bg-base-300 shadow-md transition-all duration-300 hover:scale-105 hover:bg-base-400 w-full md:w-3/4 lg:w-1/2 mx-auto"
          >
            {/* Profile Section: Profile picture and user details */}
            <div className="flex items-center gap-4">
              <img
                alt="photo"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                src={photoUrl}
              />
              <div className="text-center md:text-left">
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age + ", " + gender}
                  </p>
                )}
                <p className="text-sm text-gray-300 mt-2">{college}</p>
              </div>
            </div>

            {/* Action Buttons: Accept/Reject buttons */}
            <div className="flex flex-col gap-2 mt-4 md:mt-0 ml-auto">
              <button
                className="btn btn-primary px-5 py-2 text-sm w-24"
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary px-5 py-2 text-sm w-24"
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
