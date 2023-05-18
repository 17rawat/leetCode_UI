import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "./ProblemDetails.css";
import Cookies from "js-cookie";

const ProblemDetails = () => {
  const { problemId } = useParams();
  const [code, setCode] = useState("");

  const [language, setLanguage] = useState("javascript");

  const [problem, setProblem] = useState({});

  const url = `http://localhost:3001/problems/${problemId}`;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(url);
        // console.log(response.data.problem);
        setProblem(response.data.problem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblems();
  }, []);

  // console.log(problem);

  const problemTitle = problem.title;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      console.log(token);

      if (!token) {
        alert("You are not authorized to this page!! Sign In Please");
        return;
      }

      const config = {
        headers: {
          authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      };
      const response = await axios.post(
        "http://localhost:3001/submission",
        {
          problemId,
          problemTitle,
          code,
          language,
        },
        config
      );

      alert(response.data.status);
    } catch (error) {
      console.error(error);
      // setStatus("Server error");
    }
    // alert(`Your response has been Submitted`);
    navigate("/problems");
  };

  return (
    <div className="problem-details">
      <h2 className="problem-details__subtitle">
        Problem Title: {problem.title}
      </h2>
      <p className="problem-details__description">
        Problem Description: {problem.problemStatement}
      </p>
      <p className="problem-details__description">Input: {problem.input}</p>
      <p className="problem-details__description">Output: {problem.output}</p>
      <p className="problem-details__description">
        Explanation: {problem.explanation}
      </p>
      <div>
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <AceEditor
        mode={language}
        theme="monokai"
        value={code}
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: Infinity }}
        width="1000px"
        height="500px"
      />
      <div className="button-container">
        <button>Run</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ProblemDetails;
