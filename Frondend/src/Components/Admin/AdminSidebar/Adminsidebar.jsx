import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTachometer,
  faUserMd,
  faList,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Adminsidebar.css";

const Adminsidebar = () => {
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
          <li className="adminSidebar-List">
            <FontAwesomeIcon icon={faUser} className="adminSidebar-icon" />
            <Link to="/admin/userlist" className="next-link"> Users</Link>
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
        </ul>
      </div>
    </div>
  );
};

export default Adminsidebar;
