import { useEffect, useState } from "react";
import "./nav.scss";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "universal-cookie";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ userName }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  ////////////////LogOut//////////////////////////////////////////
  const toggleLogutButtton = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const cookies = new Cookies();
  const logoutHandler = () => {
    cookies.remove("accessToken");
    cookies.remove("userId");
    cookies.remove("userName");
    navigate("/signin");
  };
  ///////////////////////////////////////////

  return (
    <nav className="headings">
      <div>Pooling App</div>
      <div className="logo-details">
        <FaUserCircle
          onClick={toggleLogutButtton}
          style={{ cursor: "pointer" }}
        />{" "}
        {userName && (
          <>
            {isDropdownOpen && (
              <div style={{ backgroundColor: "red", border: "2px solid red" }}>
                <Button
                  text="Logout"
                  className="btn-cls"
                  onClick={logoutHandler}
                />
              </div>
            )}
          </>
        )}
        {userName}
      </div>
    </nav>
  );
};

export default Navbar;
