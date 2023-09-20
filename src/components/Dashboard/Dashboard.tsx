import { Button } from "devextreme-react";
import "./dashBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import VoteList from "../Vote/Vote";

const Dashboard = () => {
  const [pollData, setPollData] = useState<any>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/polls")
      .then((res) => setPollData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  console.log("polldata", pollData, pollData);

  const onClickHandler = () => {
    // e.preventDefault();
    navigate("/signup");
    console.log("=====");
  };

  return (
    <div className="dashboard-container">
      <div className="vote-section">
        <VoteList voteData={pollData} />
      </div>
      <div className="welcome-section">
        <div>Welcome to Polling App</div>
        <small>Create account to upload Polls and Votes</small>
        {/* <div className="btn"> */}
        <Button
          text="Create Account"
          className="bttn"
          onClick={onClickHandler}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
