import { useState, useEffect } from "react";
import axios from "axios";

import "./ProblemList.css";
import { Link } from "react-router-dom";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

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
              <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
            </td>
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
    </table>
  );
};

export default ProblemList;
