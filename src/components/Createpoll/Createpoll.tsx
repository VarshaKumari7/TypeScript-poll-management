import "devextreme/dist/css/dx.light.css";
import { Popup } from "devextreme-react/popup";
import "../Createpoll/createpoll.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Createpoll = () => {
  interface PollValues {
    question: string;
    options: string[];
  }
  const [values, setValues] = useState<PollValues>({
    question: "",
    options: ["", "", "", "", ""],
  });

  const onValueChanged = (e: any) => {
    const ques = e.target.value;
    const options = e.target.value;
    //     const updatedValues = { ...values };
    //     (updatedValues as any)[key] = e.value;

    //     setValues(updatedValues);
    console.log("object", values, ques, options);
  };

  const navigate = useNavigate();
  const togglePopup = () => {
    navigate("/dashboard");
  };

  //   const submitPollHandle = async (e: any) => {
  //     console.log("Question:", values.question);
  //     console.log("Options:", values.options);
  //   };
  const submitPollHandle = (e: any) => {
    //     // e.preventDefault();
    //     const ques = e.target.value;
    //     const options = e.target.value;
    //     // const values = {
    //     //   question: e.target.elements.question.value,
    //     //   options: e.target.elements.options.value,
    //     // };
    //     // try {
    //     //   const response = await axios.post(
    //     //     "http://localhost:8000/api/polls/create",
    //     //     values
    //     //   );
    //     //   console.log("value", response.data);
    //     // } catch (error) {
    //     //   console.error("Error", error);
    //     // }
    console.log("ghjghjdb");
  };
  return (
    <div className="App">
      <Popup
        contentRender={() => (
          <>
            <div className="heading">Create Poll</div>
            <div className="ques-area">
              <span>Enter Question</span>
              <TextBox
                value={values.question}
                onValueChanged={onValueChanged}
              />
            </div>
            <div className="text-area">
              <span>Enter options</span>
              <div className="text-box">
                {values.options.map((option, index) => (
                  <TextBox
                    key={index}
                    value={option}
                    onValueChanged={onValueChanged}
                  />
                ))}
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
      {/* <Button text="Open popup" onClick={togglePopup} /> */}
    </div>
  );
};

export default Createpoll;
