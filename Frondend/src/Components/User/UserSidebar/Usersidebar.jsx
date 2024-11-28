import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faBookBookmark,
  faWallet,
  faUserNurse,
  faRightToBracket,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../../Redux/User/UserSlice";
import { useDispatch } from "react-redux";
import "./Usersidebar.css";
import { ConfirmAlert } from "../..";

const sidebar = [
  { url: "/profile", icon: faUserEdit, title: "Profile" },
  { url: "/booking-history", icon: faBookBookmark, title: "My Bookings" },
  { url: "/following-doctors", icon: faPeopleGroup, title: "Following Doctors" },
  { url: "/wallet", icon: faUserEdit, title: "Wallet" },
];

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
        {sidebar.map((data, index) => (
          <li key={index}
            className={`userSidebar-list ${
              isActive === data.url ? "active" : ""
            }`}
            onClick={() => handleActive()}
          >
            <FontAwesomeIcon icon={data.icon} className="user-profile-icon" />
            <Link to={data.url} className="profile-link">
              {data.title}
            </Link>
          </li>
        ))}

        <li className="userSidebar-list" onClick={handleUserLogout}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="user-profile-icon"
          />
          <p className="profile-link">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Usersidebar;
