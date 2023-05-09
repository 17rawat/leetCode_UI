import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Signin from "./component/Auth/Signin";

import Signup from "./component/Auth/Signup";
import Home from "./component/Home";
import ProblemList from "./component/Problem/ProblemList";
import Header from "./component/Header/Header";
import Cookies from "js-cookie";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  useEffect(() => {
    // for showing the  username on the header after user reload the page
    const isLoggedInCookie = Cookies.get("isLoggedIn");

    console.log(isLoggedInCookie);

    if (isLoggedInCookie === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("username");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/signin"
          element={<Signin setIsLoggedIn={setIsLoggedIn} />}
        ></Route>

        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route path="/problems" element={<ProblemList />}></Route>
      </Routes>
    </div>
  );
}
