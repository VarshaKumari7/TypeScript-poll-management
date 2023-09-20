import { Button } from "devextreme-react";
import "./dashBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import VoteList from "../Vote/Vote";
import { Popup } from "devextreme-react/popup";

const Dashboard = () => {
  const [pollData, setPollData] = useState<any>([]);
  const [error, setError] = useState("");
  const [isPopupVisible, setPopupVisibility] = useState(true);

  const togglePopup = () => {
    // setPopupVisibility(!isPopupVisible);
    navigate("/createpoll");
  };
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
        <Button
          text="Create Account"
          className="bttn"
          onClick={onClickHandler}
        />
        {/* <Popup
          visible={isPopupVisible}
          hideOnOutsideClick={true}
          onHiding={togglePopup}
        /> */}
        <Button text="Open popup" onClick={togglePopup} />
      </div>
    </div>
  );
};

export default Dashboard;
