import axios from "axios";
import "./vote.scss";
import { FaUserCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useState } from "react";
import { Button } from "devextreme-react";

const VoteList = ({ voteData }: any) => {
  console.log(voteData, "voteData");

  return (
    <>
      {voteData.length > 0 &&
        voteData?.map((singleVoteObj: any) => {
          return <Vote key={singleVoteObj?._id} voteDetails={singleVoteObj} />;
        })}
    </>
  );
};

const Vote = ({ voteDetails }: any) => {
  console.log(voteDetails, "voteDetails");

  const pollDeleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/polls/delete/${voteDetails._id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA4MTgzOWMwZmExMDcwOTBmY2MzYzIiLCJ1c2VybmFtZSI6ImFiY2RlZiIsImlhdCI6MTY5NTEyMjI5OH0.mkJr7cnBir5yhyttNUUsJqO_e8ECuU9Rc-PMGNCTupg`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vote-box">
      <div className="vote-details">
        <div className="vote-details-left">
          <FaUserCircle />
          <span>Created by {voteDetails.user.username}</span>
        </div>
        <div className="vote-details-right">
          <IoMdTime />
          <span>Created on {voteDetails.created}</span>
        </div>
      </div>

      <div className="question-section">{voteDetails.question}</div>
      <div className="login">
        <a href="/signin" className="login-section">
          You have to login to vote.
        </a>
      </div>
      <div>
        <span>Voted by {voteDetails.votes} people</span>
      </div>
      <div>
        {voteDetails.options.map((options: any) => {
          return (
            <VoteFor
              key={options._id}
              options={options}
              voteDetails={voteDetails}
            />
          );
        })}
      </div>
      <Button
        text="Delete poll"
        onClick={pollDeleteHandler}
        className="delete-btn"
      />
    </div>
  );
};

const VoteFor = ({ options, voteDetails }: any) => {
  console.log(`Option: ${options.option}`);
  console.log("User ID:", voteDetails.user);
  console.log("Voted Array:", voteDetails.voted);

  const onClickVoteHandler = (e: any) => {
    console.log("Voted for", options._id, options.option, voteDetails._id);
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/api/polls/vote/${voteDetails._id}`,
        { answer: options.option },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA4MTgzOWMwZmExMDcwOTBmY2MzYzIiLCJ1c2VybmFtZSI6ImFiY2RlZiIsImlhdCI6MTY5NTEyMjI5OH0.mkJr7cnBir5yhyttNUUsJqO_e8ECuU9Rc-PMGNCTupg`,
          },
        }
      )
      .then((response) => {
        console.log(response.status, response.data.token);
      })
      .catch(Error);
  };

  const shouldHighlight = options.votes === 1;

  return (
    <>
      <span
        className="vote-options"
        onClick={onClickVoteHandler}
        style={shouldHighlight ? { backgroundColor: "green" } : {}}
      >
        {options.option}{" "}
      </span>
    </>
  );
};

export default VoteList;
