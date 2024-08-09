import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTachometer,
  faUserMd,
  faList,
  faCalendarCheck,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./Adminsidebar.css";

const Adminsidebar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);

  const handleActive = (path) => {
    setIsActive(path);
  };

  return (
    <div className="adminSidebar-main">
      <div className="adminSidebar-child">
        <ul className="adminSidebar-ulList">
          <li className="adminSidebar-List">
            <FontAwesomeIcon
              icon={faTachometer}
              className="adminSidebar-icon"
            />
            Admin Dashboard
          </li>
          <li
            className={`adminSidebar-List ${
              isActive === "/admin/userlist" ? "active" : ""
            }`}
            onClick={() => handleActive()}
          >
            <FontAwesomeIcon icon={faUser} className="adminSidebar-icon" />
            <Link to="/admin/userlist" className="next-link">
              Users
            </Link>
          </li>
          <li className="adminSidebar-List">
            <FontAwesomeIcon icon={faUserMd} className="adminSidebar-icon" />
            Doctors
          </li>
          <li className="adminSidebar-List">
            <FontAwesomeIcon icon={faList} className="adminSidebar-icon" />
            Categories
          </li>
          <li className="adminSidebar-List">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="adminSidebar-icon"
            />
            Booking Details
          </li>
          <li className="adminSidebar-List">
            <FontAwesomeIcon
              icon={faImage}
              className="adminSidebar-icon"
            />
            Banners
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Adminsidebar;
