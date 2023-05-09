import React, { useState } from "react";
import "./Signin.css";
import logo from "../Header/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const Signin = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const url = "http://localhost:3001/users/signin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        Cookies.set("username", response.data.user.username);
        Cookies.set("isLoggedIn", true);
        props.setIsLoggedIn(true);

        setUsername("");
        setEmail("");
        setPassword("");

        navigate("/problems");
      } else {
        console.log(response.data.error); // display the error message
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
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

Signin.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Signin;
