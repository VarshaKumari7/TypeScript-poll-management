import React, { useState } from "react";
import { Popup, TextBox, Button } from "devextreme-react";
import "../Createpoll/createpoll.scss";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Createpoll = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<any>(["", "", "", "", ""]);

  const onQuestionChange = (e: any) => {
    setQuestion(e);
    console.log("onQuestionChange", e);
  };

  const onOptionChange = (index: any, e: any) => {
    const newOptions = [...options];
    newOptions[index] = e;
    setOptions(newOptions);
    console.log("onOptionChange", newOptions);
  };

  const navigate = useNavigate();
  const togglePopup = () => {
    navigate("/dashboard");
  };

  const submitPollHandle = async (e: any) => {
    const values = {
      question: question,
      options: options,
    };
    console.log("Question:", question);
    console.log("Options:", options);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/polls/create",
        values,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA4MTgzOWMwZmExMDcwOTBmY2MzYzIiLCJ1c2VybmFtZSI6ImFiY2RlZiIsImlhdCI6MTY5NTEyMjI5OH0.mkJr7cnBir5yhyttNUUsJqO_e8ECuU9Rc-PMGNCTupg`,
          },
        }
      );
      console.log("value%%%%%%%", response);
    } catch (error) {
      console.error("Error", error);
    }
    setQuestion("");
    setOptions(["", "", "", "", ""]);
    console.log("ghjghjdb&&&&&&", values);
  };

  return (
    <div className="App">
      <Popup
        contentRender={() => (
          <>
            <div className="heading">Create Poll</div>
            <div className="ques-area">
              <span>Enter Question</span>
              <TextBox value={question} onValueChange={onQuestionChange} />
            </div>
            <div className="text-area">
              <span>Enter options</span>
              <div className="text-box">
                {options?.map((option: any, index: number) => {
                  return (
                    <TextBox
                      key={index}
                      value={option}
                      onValueChange={(e) => onOptionChange(index, e)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="bttn-div">
              <Button
                text="Create poll"
                className="btn-cls"
                onClick={submitPollHandle}
              />
            </div>
          </>
        )}
        visible={true}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
      />
    </div>
  );
};

export default Createpoll;
