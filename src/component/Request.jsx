import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { FaCheck, FaTimes, FaUserClock } from 'react-icons/fa';
import TimeAgo from 'timeago-react';

const Request = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      dispatch(addRequests(data?.data || []));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-xl flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-md mx-auto">
          <FaUserClock className="text-6xl text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">No Pending Requests</h2>
          <p className="text-gray-400">Connection requests will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Connection Requests</h1>
      
      <div className="space-y-4">
        {requests.map((request) => {
          const { _id, fromUserId, createdAt } = request;
          const { firstName, lastName, photoUrl, age, gender, college } = fromUserId;

          return (
            <div 
              key={_id}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-800 rounded-2xl hover:bg-gray-700/50 transition-all duration-300"
            >
              {/* Left Section - User Info */}
              <div className="flex items-start w-full md:w-auto">
                {/* Profile Image */}
                <img
                  src={photoUrl || '/default-avatar.png'}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-600 mr-4"
                  alt={`${firstName}'s profile`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                  }}
                />

                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                    <h3 className="text-white font-semibold whitespace-nowrap">
                      {firstName} {lastName}
                    </h3>
                    <span className="text-xs text-gray-400 mt-1 md:mt-0">
                      <TimeAgo datetime={createdAt} />
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {college && (
                      <p className="truncate text-xs md:text-sm">
                        {college}
                      </p>
                    )}
                    {(age || gender) && (
                      <p className="text-xs mt-1">
                        {age && <span>{age} yrs</span>}
                        {age && gender && <span className="mx-1.5">•</span>}
                        {gender && <span>{gender}</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Bottom on mobile */}
              <div className="flex gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
                <button
                  onClick={() => reviewRequest('accepted', _id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-900 hover:bg-green-600 rounded-xl transition-all duration-300"
                >
                  <FaCheck className="text-lg" />
                  <span className="text-sm">Accept</span>
                </button>
                <button
                  onClick={() => reviewRequest('rejected', _id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-600 rounded-xl transition-all duration-300"
                >
                  <FaTimes className="text-lg" />
                  <span className="text-sm">Reject</span>
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