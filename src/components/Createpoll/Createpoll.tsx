import "devextreme/dist/css/dx.light.css";
import { Popup } from "devextreme-react/popup";
import "../Createpoll/createpoll.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// const renderContent = () => {
//   const [value, setValue] = useState<any>({
//     question: "",
//     options: [],
//   });
//   const onValueChange = (e: any) => {
//     console.log(e.value);
//   };

//   const submitPollHandle = ()=>{
//     axios.post("http://localhost:8000/api/polls/create", value);
//   }

//   return (
//     <>
//       <div className="heading">Create Poll</div>
//       <div className="ques-area">
//         <span>Enter Question</span>
//         <TextBox value={value.question} onValueChange={onValueChange} />
//       </div>
//       <div className="text-area">
//         <span>Enter options</span>
//         <div className="text-box">
//           <TextBox value={value.options[0]} onValueChange={onValueChange} />
//           <TextBox value={value.options[1]} onValueChange={onValueChange} />
//           <TextBox value={value.options[2]} onValueChange={onValueChange} />
//           <TextBox value={value.options[3]} onValueChange={onValueChange} />
//           <TextBox value={value.options[4]} onValueChange={onValueChange} />
//         </div>
//       </div>
//       <div className="bttn-div">
//         <Button text="Create poll" className="btn-cls" />
//       </div>
//     </>
//   );
// };

const Createpoll = () => {
  interface PollValues {
    question: string;
    options: string[];
  }
  const [values, setValues] = useState<PollValues>({
    question: "",
    options: ["", "", "", "", ""],
  });

  //   const onValueChange = (e: any, key: string) => {
  //     const updatedValues = { ...values };
  //     (updatedValues as any)[key] = e.value;

  //     setValues(updatedValues);
  //   };

  //   console.log("object", values);

  const navigate = useNavigate();
  const togglePopup = () => {
    navigate("/dashboard");
  };

  const submitPollHandle = async (formSubmitEvent: any) => {
    // You can access the updated values here
    console.log("Question:", values.question);
    console.log("Options:", values.options);

    // ... (the rest of your code)
  };
  //   const submitPollHandle = async (formSubmitEvent: any) => {
  //     formSubmitEvent.preventDefault();
  //     const value = {
  //       username: formSubmitEvent.target.elements.userName.value,
  //       password: formSubmitEvent.target.elements.password.value,
  //     };
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/api/polls/create",
  //         value
  //       );
  //       console.log("value", response.data);
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //     console.log("ghjghjdb", values);
  //   };
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
                // onValueChange={(e) => onValueChange(e, "question")}
              />
            </div>
            <div className="text-area">
              <span>Enter options</span>
              <div className="text-box">
                {values.options.map((option, index) => (
                  <TextBox
                    key={index}
                    value={option}
                    // onValueChange={(e) =>
                    //   onValueChange(e, "options[" + index + "]")
                    // }
                    // onValueChange={(e) => onValueChange(e, `options[${index}]`)}
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
