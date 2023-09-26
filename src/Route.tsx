import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import SignIn from "./components/Signin";
import Poll from "./components/poll";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Createpoll from "./components/Createpoll/Createpoll";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

const Routepage = () => {
  const [userName, setUserName] = useState<any>("");
  const handleSignIn = (name: any) => {
    setUserName(name);
    console.log("563565", userName);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar userName={userName} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SignIn handleSignIn={handleSignIn} />} />
          <Route
            path="/signin"
            element={<SignIn handleSignIn={handleSignIn} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createpoll" element={<Createpoll />} />
          {/* <Route path="/user" element={<PrivateRoute />}> */}
          {/* <Route path="Poll" element={<Poll />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routepage;
