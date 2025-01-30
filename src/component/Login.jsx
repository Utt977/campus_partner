import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials : true});
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center  my-4">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">{isLoginFrom ? "Login" : "Signup"}</h2>
          <div>
          {!isLoginFrom && <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">FirstName</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">LastName</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </>}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className='text-red-600'>{error}</p>
          <div className="card-actions flex flex-col items-center">
            <button className="btn btn-primary" onClick={isLoginFrom ? handleLogin : handleSignUp}>
              {isLoginFrom ? "Login" : "Signup"}
            </button>
          </div>
          <p className='mx-auto cursor-pointer font-semibold' onClick={() => setIsLoginForm((value) => !value)}>{isLoginFrom ? "New User ? Sigup Here" : "Existing User ? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
