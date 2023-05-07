import React from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isHeaderRoute = location.pathname === "/";

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
            <Link to="/problemset/all">Problems</Link>
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
          {isHeaderRoute && (
            <li>
              <Link to="/signin">
                <i className="fa fa-user"></i>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
