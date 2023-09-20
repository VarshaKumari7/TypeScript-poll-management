import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import SignIn from "./components/Signin";
import Poll from "./components/poll";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";

const Routepage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="/user" element={<PrivateRoute />}> */}
          {/* <Route path="Poll" element={<Poll />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routepage;
