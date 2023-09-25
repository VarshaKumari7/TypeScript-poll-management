import { useEffect, useState } from "react";
import "./nav.scss";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
const Navbar = () => {
  const [pollData, setPollData] = useState<any>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/polls")
      .then((res) => setPollData(res.data))
      .catch(Error);
    // console.log("navbar", pollData[0]);
  }, []);
  return (
    <nav className="headings">
      <div>Pooling App</div>
      <div className="logo-details">
        <FaUserCircle />
        {pollData[0]?.user?.username}
      </div>
    </nav>
  );
};

export default Navbar;
