import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Submissions.css";
import { Link } from "react-router-dom";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // const problemId = "YOUR_PROBLEM_ID"; // Replace with the actual problemId

        const token = Cookies.get("token");
        const config = {
          headers: {
            authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        };

        const response = await axios.get(
          "http://localhost:3001/submission",
          config
        );

        console.log(response);

        setSubmissions(response.data.submissions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, []);

  console.log(submissions);

  return (
    <div>
      <h1>All My Submissions</h1>
      {submissions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>
                  <Link to={`/submissions/${submission._id}`}>
                    {submission.title}
                  </Link>
                </td>

                <td
                  className={
                    submission.status === "Accepted"
                      ? "status-correct"
                      : "status-incorrect"
                  }
                >
                  {submission.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>You have no submissions at the moment.</h1>
      )}
    </div>
  );
}
