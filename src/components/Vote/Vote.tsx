import axios from "axios";
import "./vote.scss";
import { FaUserCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Button } from "devextreme-react";
import { Cookies } from "react-cookie";
import notify from "devextreme/ui/notify";

const VoteList = ({ voteData, setUpdate }: any) => {
  // console.log(voteData, "voteData");
  return (
    <>
      {voteData.length > 0 &&
        voteData?.map((singleVoteObj: any) => {
          return (
            <Vote
              key={singleVoteObj?._id}
              voteDetails={singleVoteObj}
              setUpdate={setUpdate}
            />
          );
        })}
    </>
  );
};

const Vote = ({ voteDetails, setUpdate }: any) => {
  const cookies = new Cookies();
  const types = ["error", "success"];
  const successMessagePollDelete = () => {
    notify(
      {
        message: "Poll deleted successfully",
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[1],
      3000
    );
  };
  const errorMessagePollDelete = (error: any) => {
    notify(
      {
        message: error.response.data.message,
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[0],
      3000
    );
  };

  const successVoteMessage = () => {
    notify(
      {
        message: "You have voted successfully",
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[1],
      3000
    );
  };
  const errorVoteMessage = (error: any) => {
    console.log(error.data, error.response, "$$$$$$$$$4");
    notify(
      {
        message: error.response.data.message,
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[0],
      3000
    );
  };

  // console.log(voteDetails, "voteDetails");
  const AuthorizationToken = cookies.get("accessToken");
  // console.log("hardcode token", AuthorizationToken);
  const pollDeleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/polls/delete/${voteDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      successMessagePollDelete();
      setUpdate((prev: any) => !prev);
      console.log(response, "detetetetete");
    } catch (error) {
      console.log(error);
      errorMessagePollDelete(error);
    }
  };
  const onClickVoteHandler = (e: any, options: any) => {
    e.preventDefault();
    const cookies = new Cookies();
    const AuthorizationToken = cookies.get("accessToken");
    axios
      .post(
        `http://localhost:8000/api/polls/vote/${voteDetails._id}`,
        { answer: options.option },
        {
          headers: {
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA4MTgzOWMwZmExMDcwOTBmY2MzYzIiLCJ1c2VybmFtZSI6ImFiY2RlZiIsImlhdCI6MTY5NTEyMjI5OH0.mkJr7cnBir5yhyttNUUsJqO_e8ECuU9Rc-PMGNCTupg`,
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status, response.data.token);
        successVoteMessage();
        setUpdate((prev: any) => !prev);
      })
      .catch((error) => {
        console.log("Error", error);
        errorVoteMessage(error);
      });
  };
  return (
    <div className="vote-box">
      <div className="vote-details">
        <div className="vote-details-left">
          <FaUserCircle />
          {/* <span>Created by {voteDetails.user.username}</span> */}
          <span>Created by {voteDetails?.user?.username}</span>
        </div>
        <div className="vote-details-right">
          <IoMdTime />
          <span>Created on {voteDetails.created}</span>
        </div>
      </div>

      <div className="question-section">{voteDetails.question}</div>
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
              onVoteClick={onClickVoteHandler}
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

const VoteFor = ({ options, voteDetails, onVoteClick }: any) => {
  const shouldHighlight = options.votes === 1;
  return (
    <>
      <span
        className="vote-options"
        onClick={(e) => {
          onVoteClick(e, options);
        }}
        style={shouldHighlight ? { backgroundColor: "green" } : {}}
      >
        {options.option}{" "}
      </span>
    </>
  );
};

export default VoteList;
