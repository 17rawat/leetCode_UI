import React, { useState } from "react";
import "./Signup.css";
import logo from "../Header/logo.png";

import axios from "axios";
import Header from "../Header/Header";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const url = "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/users/signup`, {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="logo">
          <img src={logo} alt="LeetCode Logo" />
          <span>LeetCode</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/* <label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label> */}
          <button type="submit">Sign Up</button>
          <p>
            Have an account? <a href="/signin">Sign In</a>
          </p>

          <div className="form-social">
            <button type="button" className="btn-google">
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <button type="button" className="btn-facebook">
              <i className="fab fa-facebook-f"></i> Sign in with Facebook
            </button>
          </div>

          <p>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
