import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "react-modal";

import "./ProblemList.css";
import { Link } from "react-router-dom";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  const isLoggedIn = Cookies.get("isLoggedIn");

  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleLinkClick = () => {
    if (!isLoggedIn) {
      setShowSignInModal(true);
    }
  };

  console.log(isLoggedIn);

  const url = "http://localhost:3001/problems";

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(url);
        // console.log(response.data.problems);
        setProblems(response.data.problems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Acceptance Rate</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem._id}>
            <td style={{ cursor: "pointer" }}>
              {isLoggedIn ? (
                <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
              ) : (
                <span
                  onClick={handleLinkClick}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {problem.title}
                </span>
              )}
            </td>
            {/* <td style={{ cursor: "pointer" }}>
              <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
            </td> */}
            <td>{problem.acceptanceRate}</td>
            <td
              style={{
                color:
                  problem.difficulty === "Easy"
                    ? "green"
                    : problem.difficulty === "Medium"
                    ? "Blue"
                    : "red",
              }}
            >
              {problem.difficulty}
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        isOpen={showSignInModal}
        onRequestClose={() => setShowSignInModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "300px",
            height: "200px",
            margin: "auto",
            marginTop: "100px",
            textAlign: "center",
          },
        }}
        ariaHideApp={false}
      >
        <p>Please sign in to access the problem.</p>
        <Link to="/signin">Sign In</Link>
      </Modal>
    </table>
  );
};

export default ProblemList;
