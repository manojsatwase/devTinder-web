import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("manoj@gmail.com");
  const [password, setPassword] = useState("Manoj@123");
  const [error,setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(state=>state.user);
  if(userData) return navigate("/");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
      }, {
        withCredentials: true
      })
      const { message, user } = res?.data;
      // dispatch and action
      dispatch(addUser(user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">LogIn</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Please Enter Valid Email ID"
                className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                onChange={(e) => setEmailId(e.target.value)}
              // binding this emailID to my input box
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Please Enter Valid Password"
                className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary bg-primary border-0 p-2"
              onClick={handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;