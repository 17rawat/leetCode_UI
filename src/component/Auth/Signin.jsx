import React, { useState } from "react";
import "./Signin.css";
import logo from "../Header/logo.png";
import axios from "axios";
import Header from "../Header/Header";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        username,
        email,
        password,
      });
      console.log(response.data); // do something with the response
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-form-container">
        <div className="logo">
          <img src={logo} alt="LeetCode Logo" />
          <span>LeetCode</span>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              id="username-email"
              placeholder="Username or Email"
              value={username || email}
              onChange={(e) =>
                setUsername(e.target.value) || setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
          <div className="form-options">
            <a href="#">Forgot Password?</a>
            <a href="/signup">Sign Up</a>
          </div>
          <hr />
          <div className="form-social">
            <button type="button" className="btn-google">
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <button type="button" className="btn-facebook">
              <i className="fab fa-facebook-f"></i> Sign in with Facebook
            </button>
          </div>
          <div className="form-policy">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
