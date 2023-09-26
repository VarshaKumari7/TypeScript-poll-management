import { Button } from "devextreme-react";
import "./dashBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import VoteList from "../Vote/Vote";
import Cookies from "universal-cookie";

const Dashboard = ({ handleSignIn }: any) => {
  const [pollData, setPollData] = useState<any>([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState<boolean>(false);
  const togglePopup = () => {
    navigate("/createpoll");
  };
  const navigate = useNavigate();
  const cookies = new Cookies();

  // useEffect(() => {
  //   const isAuthenticated = cookies.get("accessToken");
  //   axios
  //     .get("http://localhost:8000/api/polls/user", {
  //       headers: {
  //         // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBjMWJhNDdkMTQ3YjQ5NzAwNzMzODEiLCJ1c2VybmFtZSI6Ikx1aXMiLCJpYXQiOjE2OTUzNjMyNTZ9.WQQE17p_cuIbNRG-LDn8UeN50FmIvvcho9kpAZjilr0`,
  //         Authorization: `Bearer ${isAuthenticated}`,
  //       },
  //     })
  //     .then((res) => setPollData(res.data))
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  //   console.log("pollData******%%%%", pollData);
  // }, []);

  useEffect(() => {
    const authenticatedToken = cookies.get("accessToken");
    axios
      .get("http://localhost:8000/api/polls", {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBjMWJhNDdkMTQ3YjQ5NzAwNzMzODEiLCJ1c2VybmFtZSI6Ikx1aXMiLCJpYXQiOjE2OTUzNjMyNTZ9.WQQE17p_cuIbNRG-LDn8UeN50FmIvvcho9kpAZjilr0`,
          Authorization: `Bearer ${authenticatedToken}`,
        },
      })
      .then((res) => {
        setPollData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [update]);

  // const logoutHandler = () => {
  //   cookies.remove("accessToken");
  //   cookies.remove("userId");
  //   cookies.remove("userName");
  //   navigate("/signin");
  // };
  useEffect(() => {
    const authenticatedToken = cookies.get("accessToken");
    // console.log("isAuthenticated", authenticatedToken);
    if (authenticatedToken) {
      navigate("/dashboard");
      handleSignIn();
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="vote-section">
        <VoteList voteData={pollData} setUpdate={setUpdate} />
      </div>
      <div className="welcome-section">
        <div>Welcome to Polling App</div>
        <Button text="Create Poll" onClick={togglePopup} className="poll" />
        {/* <Button text="Log Out" onClick={logoutHandler} className="poll" /> */}
      </div>
    </div>
  );
};

export default Dashboard;
