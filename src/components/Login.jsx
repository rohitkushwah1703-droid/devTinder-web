import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants";

const Login = () => {
  const [emailId, setEmailId] = useState("Java@123.com");
  const [password, setPassword] = useState("Java@2233");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      if (response) {
        console.log(response.data);
        dispatch(addUser(response.data.data));
        return navigate("/");
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };
  return (
    <>
      <div className="flex justify-center my-3">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="flex flex-col gap-2 ">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  value={emailId}
                  placeholder="mail@site.com"
                  onChange={() => setEmailId(e.target.value)}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </g>
                </svg>

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  minLength={8}
                  onChange={() => setPassword(e.target.value)}
                  pattern=".{8,}"
                />
              </label>

              <div className="validator-hint hidden">
                Password must be at least 8 characters
              </div>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
