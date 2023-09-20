import { Button } from "devextreme-react";
import Form from "devextreme-react/form";
import { useEffect, useState } from "react";
import "./signup.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [InputData, setInputData] = useState<any>({
    userName: "",
    password: "",
  });
  console.log("InputData", InputData);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const loginHandler = async (formSubmitEvent: any) => {
    formSubmitEvent.preventDefault();
    const inputData = {
      username: formSubmitEvent.target.elements.userName.value,
      password: formSubmitEvent.target.elements.password.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        inputData
      );
      console.log("log In", response.data);
      cookies.set("accessToken", response.data.token, { path: "/" });

      cookies.set("userId", response.data._id, { path: "/" });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const isAuthenticated = !!cookies.get("accessToken");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div id="form-demo">
      <h1>Hello World</h1>
      <div className="widget-container">
        {/* {isAuthenticated ? (
          <div>
            <p>You are logged in!</p>
          </div>
        ) : ( */}
        <form onSubmit={loginHandler}>
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
          ></Form>
          <Button useSubmitBehavior text="submit" />
        </form>
        {/* )} */}
      </div>
      {/* <div>
        <a href="/signup">logout</a>
      </div> */}
    </div>
  );
}

export default Signup;
