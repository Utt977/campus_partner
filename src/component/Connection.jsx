import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 font-bold text-3xl text-white">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4 md:px-0">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, college, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center justify-between gap-4 mb-6 md:mb-4 p-4 rounded-lg bg-base-300 shadow-md transition-all duration-300 hover:scale-105 hover:bg-base-400 w-full md:w-3/4 lg:w-1/2 mx-auto"
          >
            {/* Profile Section: Profile picture and student details */}
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

            {/* Chat Button Section: Justified to the end */}
            <div className="flex justify-end">
              <Link to={"/chat/" + _id}>
                <button className="btn btn-primary px-5 py-2 text-sm md:text-base">
                  Chat
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
