import React, { useState } from "react";
import Form, { Item, GroupItem, Label } from "devextreme-react/form";
import { Button } from "devextreme-react";
import LabelTemplate from "./LabelTemplate";
import { ClickEvent } from "devextreme/ui/button";
import { EventInfo } from "devextreme/events";

interface ValidationRule {
  type: "required";
  message: string;
}

interface ValidationRules {
  user: ValidationRule[];
  email: ValidationRule[];
  pass: ValidationRule[];
}

const validationRules: ValidationRules = {
  user: [{ type: "required", message: "username is required." }],
  email: [{ type: "required", message: "email is required." }],
  pass: [{ type: "required", message: "password is required." }],
};

const nameEditorOptions: any = { disabled: false };

interface formInputType {
  name: string;
  email: string;
  password: string;
}
export default function Signup() {
  const [formInput, setFormInput] = useState<formInputType>({
    name: "",
    email: "",
    password: "",
  });

  const onValueChange = (event: any) => {
    const nameData = event.target.name;
    const valueData = event.target.value;
    setFormInput((prevState) => ({
      ...prevState,
      [nameData]: valueData,
    }));
  };

  // const onSubmitForm : any =(e. ClickEvent)=>{

  // }
  const validateForm: any = React.useCallback((e: EventInfo<any>) => {
    e.component.validate();
    console.log(e, "e");
  }, []);

  return (
    <Form onContentReady={validateForm}>
      <GroupItem>
        <Item
          dataField="UserName"
          editorOptions={nameEditorOptions}
          validationRules={validationRules.user}
        >
          <Label render={LabelTemplate("user")} />
        </Item>

        <Item dataField="Email" validationRules={validationRules.email}>
          <Label render={LabelTemplate("email")} />
        </Item>
        <Item
          dataField="Password"
          // editorOptions={phoneEditorOptions}
          validationRules={validationRules.pass}
        >
          <Label render={LabelTemplate("pass")} />
        </Item>
        <Item>
          <Button text="Sign Up" />
        </Item>
      </GroupItem>
    </Form>
  );
}

///////Sign in ////////////////////
// import React, { useState, useCallback } from "react";
// import TextBox from "devextreme-react/text-box";
// import Validator, { RequiredRule, EmailRule } from "devextreme-react/validator";
// import ValidationGroup from "devextreme-react/validation-group";
// import Button from "devextreme-react/button";

// export default function SignIn(): JSX.Element {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const validate = useCallback((params: any) => {
//     const result = params.validationGroup.validate();
//     if (result.isValid) {
//       // The values are valid
//       // Submit them...
//       // ...
//       // ... and then reset
//       // params.validationGroup.reset();
//     }
//   }, []);
//   const handleEmailChange = useCallback((e: any) => {
//     console.log("Email", e.value);
//     setEmail(e.value);
//   }, []);
//   const handlePasswordChange = useCallback((e: any) => {
//     console.log("password", e.value);
//     setPassword(e.value);
//   }, []);

//   return (
//     <ValidationGroup>
//       <TextBox value={email} onValueChanged={handleEmailChange}>
//         <Validator>
//           <RequiredRule message="Email is required" />
//           <EmailRule message="Email is invalid" />
//         </Validator>
//       </TextBox>

//       <TextBox
//         value={password}
//         mode="password"
//         onValueChanged={handlePasswordChange}
//       >
//         <Validator>
//           <RequiredRule message="Password is required" />
//         </Validator>
//       </TextBox>
//       <Button onClick={validate} text="Submit" />
//     </ValidationGroup>
//   );
// }
