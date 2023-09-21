import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import SignIn from "./components/Signin";
import Poll from "./components/poll";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Createpoll from "./components/Createpoll/Createpoll";
import Navbar from "./components/Navbar/Navbar";

const Routepage = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createpoll" element={<Createpoll />} />
          {/* <Route path="/user" element={<PrivateRoute />}> */}
          {/* <Route path="Poll" element={<Poll />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routepage;
