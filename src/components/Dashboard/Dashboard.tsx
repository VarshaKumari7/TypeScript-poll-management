import { Button } from "devextreme-react";
import "./dashBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import VoteList from "../Vote/Vote";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const [pollData, setPollData] = useState<any>([]);
  const [error, setError] = useState("");

  const togglePopup = () => {
    navigate("/createpoll");
  };
  const navigate = useNavigate();
  const cookies = new Cookies();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/polls/user", {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBjMWJhNDdkMTQ3YjQ5NzAwNzMzODEiLCJ1c2VybmFtZSI6Ikx1aXMiLCJpYXQiOjE2OTUzNjMyNTZ9.WQQE17p_cuIbNRG-LDn8UeN50FmIvvcho9kpAZjilr0`,
  //       },
  //     })
  //     .then((res) => setPollData(res.data))
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  //   console.log("pollData******%%%%", pollData);
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/polls")
      .then((res) => setPollData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  console.log("userrrrrrr###", pollData);

  const onClickHandler = () => {
    // e.preventDefault();
    navigate("/signup");
    console.log("=====");
  };

  const logoutHandler = () => {
    cookies.remove("accessToken");
    cookies.remove("userId");
    navigate("/signin");
  };
  useEffect(() => {
    const isAuthenticated = cookies.get("accessToken");
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="vote-section">
        <VoteList voteData={pollData} />
      </div>
      <div className="welcome-section">
        <div>Welcome to Polling App</div>
        <small>Create account to upload Polls and Votes</small>
        <Button
          text="Create Account"
          className="bttn"
          onClick={onClickHandler}
        />
        <Button text="Create Poll" onClick={togglePopup} className="poll" />
        <Button text="Log Out" onClick={logoutHandler} className="poll" />
      </div>
    </div>
  );
};

export default Dashboard;
