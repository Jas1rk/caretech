import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faBookBookmark,
  faWallet,
  faUserNurse,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../../Redux/User/UserSlice";
import { useDispatch } from "react-redux";
import "./Usersidebar.css";
import { ConfirmAlert } from "../..";

const Usersidebar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActive = (path) => {
    setIsActive(path);
  };

  const handleUserLogout = () => {
    ConfirmAlert("Are you sure to sign out").then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout());
        navigate("/");
      }
    });
  };

  return (
    <div className="User-sidebar-main-container">
      <ul className="userSidebar-ul">
        <li
          className={`userSidebar-list ${
            isActive === "/profile" ? "active" : ""
          }`}
          onClick={() => handleActive()}
        >
          <FontAwesomeIcon icon={faUserEdit} className="user-profile-icon" />
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
        </li>
        <li className="userSidebar-list">
          <FontAwesomeIcon
            icon={faBookBookmark}
            className="user-profile-icon"
          />
          <Link to="/profile" className="profile-link">
            My Bookings
          </Link>
        </li>
        <li className="userSidebar-list">
          <FontAwesomeIcon icon={faUserNurse} className="user-profile-icon" />
          <Link to="/profile" className="profile-link">
            Patient Details
          </Link>
        </li>
        <li className="userSidebar-list">
          <FontAwesomeIcon icon={faWallet} className="user-profile-icon" />
          <Link to="/profile" className="profile-link">
            Wallet
          </Link>
        </li>
        <li className="userSidebar-list" onClick={handleUserLogout}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="user-profile-icon"
          />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Usersidebar;
