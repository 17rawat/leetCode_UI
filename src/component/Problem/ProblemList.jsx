import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import "./ProblemList.css";

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
    <table className="problem-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Accepatance Rate</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem._id}>
            <td>
              <a href={`/problem/${problem._id}`}>{problem.title}</a>
            </td>
            <td>{problem.acceptanceRate}</td>
            <td>{problem.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProblemList;
