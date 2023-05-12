import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import PropTypes from "prop-types";

function Header(props) {
  const location = useLocation();
  const isHeaderRoute =
    location.pathname === "/" || location.pathname === "/problems";

  const [username, setUsername] = useState("");

  console.log(props.isLoggedIn);

  useEffect(() => {
    if (props.isLoggedIn) {
      setUsername(Cookies.get("username"));
    } else {
      setUsername(null);
    }
  }, [props.isLoggedIn]);

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="LeetCode Logo" />
        <span>LeetCode</span>
      </div>

      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/problems">Problems</Link>
          </li>
          <li>
            <Link to="/contest">Contest</Link>
          </li>
          <li>
            <Link to="/discuss">Discuss</Link>
          </li>
          <li>
            <Link to="/premium">Premium</Link>
          </li>
          <li>
            <Link to="/notifications">
              <i className="fa fa-bell"></i>
            </Link>
          </li>

          {props.isLoggedIn ? (
            <>
              <li> Welcome {username}</li>
            </>
          ) : (
            <>
              {isHeaderRoute && (
                <li>
                  <Link to="/signin">
                    <i>Signin</i>
                  </Link>
                </li>
              )}

              {isHeaderRoute && (
                <li>
                  <span>or</span>
                </li>
              )}

              {isHeaderRoute && (
                <li>
                  <Link to="/signup">
                    <i>Register</i>
                  </Link>
                </li>
              )}
            </>
          )}

          {props.isLoggedIn && (
            <li>
              <a href="/" onClick={props.handleLogout}>
                Sign out
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  signupDetails: PropTypes.string,
  signinDetails: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
