import { Button } from "devextreme-react";
import Form from "devextreme-react/form";
import { useState } from "react";
import "./signup.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [InputData, setInputData] = useState<any>({
    // ID: 1,
    userName: "",
    password: "",
  });
  console.log("InputData", InputData);

  //   const [userName, setUserName] = useState<string>("");

  //   const userNameChangeHandler = (e: NativeEventInfo<any | Event>) => {
  //     // setUserName(e.event?.target.value);
  //     console.log(e, "event");
  //   };

  //   const handleInputChange = (e: any) => {
  //     console.log(e);
  //     e.preventDefault();
  //     // const { name, value } = e.value;
  //     const name = e.name;
  //     const value = e.value;

  //     console.log("namedata", name);
  //     console.log("value", value);
  //     setInputData((prevData: any) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //     console.log("InputData after filling", InputData, name, value);
  //   };

  const handleFormSubmit = async (formSubmitEvent: any) => {
    formSubmitEvent.preventDefault();
    const inputData = {
      username: formSubmitEvent.target.elements.userName.value,
      password: formSubmitEvent.target.elements.password.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        inputData
      );
      console.log("Registered", response.data);
    } catch (error) {
      console.error("Error", error);
    }
    console.log("ghjghjdb", InputData);
  };

  //   const handleFormSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const { userName, password } = InputData;
  //     console.log("userName", userName);
  //     console.log("password", password);
  //   };
  //   async function postdata() {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/auth/register",
  //       InputData
  //     );
  //   }

  // const handleFormSubmit = (formSubmitEvent: any) => {
  //   formSubmitEvent.preventDefault();
  //   // console.log(formSubmitEvent.target[0]);
  //   const userName = formSubmitEvent.target.elements.userName.value;
  //   const passWord = formSubmitEvent.target.elements.password.value;

  //   console.log("userName", userName);
  //   console.log("passWord", passWord);
  // };

  console.log("working");

  return (
    <div id="form-demo">
      <h1>Hello World</h1>
      <div className="widget-container">
        <form
          onSubmit={handleFormSubmit}
          //   onSubmit={(e) => {
          //     handleFormSubmit(e);
          // postdata();
          //   }}
        >
          <Form
            id="form"
            labelMode={"floating"}
            formData={InputData}
            readOnly={false}
            showColonAfterLabel={true}
            labelLocation={"left"}
            minColWidth={300}
            colCount={2}
            width={500}
          >
            {/* <div className="option">
              <TextBox
                name="userName"
                value={InputData.userName}
                onValueChange={handleInputChange}
              />
            </div>
            <div className="option">
              <TextBox
                name="password"
                value={InputData.password}
                onValueChanged={handleInputChange}
                mode="password"
              />
            </div> */}
            {/* <div className="option">
            <TextBox onChange={userNameChangeHandler} />
          </div>
          <div className="option">
            <TextBox onChange={userNameChangeHandler} />
          </div> */}
          </Form>
          <Button useSubmitBehavior text="submit" />
        </form>
      </div>
      <div>
        <Link to="/signin">Login</Link>
      </div>
    </div>
  );
}

export default Signup;