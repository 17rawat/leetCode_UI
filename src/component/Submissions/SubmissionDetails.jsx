import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AceEditor from "react-ace";
import "./SubmissionDetails.css";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function SubmissionDetails() {
  const { submissionId } = useParams();
  //   console.log(submissionId);

  const [submission, setSubmission] = useState({});

  const url = `http://localhost:3001/submission/${submissionId}`;

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        };

        const response = await axios.get(url, config);

        // console.log(response.data.submission);

        setSubmission(response.data.submission);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubmission();
  }, []);

  const naviagte = useNavigate();

  const handleEdit = () => {
    const problemId = submission.problemId;
    naviagte(`/problems/${problemId}`);
  };

  const formatTimeAgo = (time) => {
    const createdAtDate = new Date(time);
    // console.log(createdAtDate);
    if (isNaN(createdAtDate)) {
      return "Invalid date";
    }
    const formattedTime = formatDistanceToNow(createdAtDate, {
      addSuffix: true,
    });

    // console.log(formattedTime);
    return formattedTime;
  };

  // console.log(submission);

  return (
    <div className="submission-details-container">
      <h1>{submission.title}</h1>
      <h2>Submission Details</h2>

      <h4 style={{ color: submission.status === "Accepted" ? "green" : "red" }}>
        {submission.status}
      </h4>
      <h4>Submitted: {formatTimeAgo(submission.createdAt)}</h4>
      <h4>Language: {submission.language}</h4>
      <button className="edit-button" onClick={handleEdit}>
        Edit Code
      </button>
      <AceEditor
        mode={submission.language}
        theme="monokai"
        value={submission.code}
        name="code-editor"
        editorProps={{ $blockScrolling: Infinity }}
        width="1000px"
        height="500px"
        readOnly={true}
      />
    </div>
  );
}
