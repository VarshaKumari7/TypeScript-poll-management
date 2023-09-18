import "devextreme/dist/css/dx.light.css";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import SignIn from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
