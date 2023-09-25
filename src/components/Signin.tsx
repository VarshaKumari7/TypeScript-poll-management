import { Button, LoadPanel, Toast } from "devextreme-react";
import Form from "devextreme-react/form";
import { useEffect, useState } from "react";
import "./signup.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import notify from "devextreme/ui/notify";

function Signin() {
  const [InputData, setInputData] = useState<any>({
    userName: "",
    password: "",
  });
  console.log("InputData", InputData);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const types = ["error", "success"];
  const successMessage = () => {
    notify(
      {
        message: "Login Successfully",
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[1],
      2000
    );
  };
  const errorMessage = () => {
    notify(
      {
        message: "Invalid username and password",
        width: 230,
        position: {
          at: "top",
          my: "top",
          of: "#container",
        },
      },
      types[0],
      2000
    );
  };
  const [state, setState] = useState({
    loadPanelVisible: false,
    // showIndicator: true,
    // shading: true,
    // showPane: true,
    // hideOnOutsideClick: false,
  });

  const toggleLoadPanel = (visible: boolean) => {
    setState({
      loadPanelVisible: true,
    });
    if (visible) {
      setTimeout(() => {
        setState({
          loadPanelVisible: false,
        });
      }, 2000);
    }
  };

  const loginHandler = async (formSubmitEvent: any) => {
    formSubmitEvent.preventDefault();
    toggleLoadPanel(true);
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
      successMessage();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error", error);
      errorMessage();
    }
  };

  return (
    <div id="form-demo">
      <h1>Login page</h1>
      <div className="widget-container">
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
          <Button useSubmitBehavior text="Submit" className="submit-btn" />
        </form>
        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          // position={position}
          // onHiding={hideLoadPanel}
          visible={state.loadPanelVisible}

          // showIndicator={showIndicator}
          // shading={shading}
          // showPane={showPane}
          // hideOnOutsideClick={hideOnOutsideClick}
        />
      </div>
      <div>
        <a href="/signup">Don't have account? Signup </a>
      </div>
    </div>
  );
}

export default Signin;
