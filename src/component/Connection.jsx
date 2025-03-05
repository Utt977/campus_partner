import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { FaComment, FaRegCommentDots } from "react-icons/fa";
import TimeAgo from 'timeago-react';

const Connection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true
      });
      
      dispatch(addConnection(data?.data || []));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
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

  if (!connections || connections.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-md mx-auto">
          <FaRegCommentDots className="text-6xl text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">No Connections Yet</h2>
          <p className="text-gray-400">Start building connections by accepting friend requests!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Your Connections</h1>
      
      <div className="space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, college, isOnline, lastActive } = connection;

          return (
            <div 
              key={_id}
              className="group flex items-center justify-between p-4 bg-gray-800 rounded-2xl hover:bg-gray-700/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    src={photoUrl || '/default-avatar.png'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
                    alt={`${firstName}'s profile`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-semibold">
                      {firstName} {lastName}
                    </h3>
                    {!isOnline && lastActive && (
                      <span className="text-xs text-gray-400">
                        <TimeAgo datetime={lastActive} />
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {college && <p className="truncate">{college}</p>}
                    {(age || gender) && (
                      <p className="text-xs">
                        {age && <span>{age} yrs</span>}
                        {age && gender && <span className="mx-1.5">•</span>}
                        {gender && <span>{gender}</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to={`/chat/${_id}`}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-primary transition-all duration-300 group-hover:translate-x-1"
              >
                <FaComment className="text-xl text-gray-400 hover:text-white" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;