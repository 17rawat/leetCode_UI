import React from "react";
import Header from "./component/Header/Header";
import { Routes, Route } from "react-router-dom";
import Signin from "./component/Auth/Signin";

import Signup from "./component/Auth/Signup";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/signin" element={<Signin />}></Route>

        <Route path="/signup" element={<Signup />}></Route>
        {/* <Route
          path="/problems"
          element={
            <Problems signUpDetails={signUpDetails} isLoggedIn={isLoggedIn} />
          }
        ></Route> */}
      </Routes>
    </div>
  );
}
