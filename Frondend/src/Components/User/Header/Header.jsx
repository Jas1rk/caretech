import React from "react";
import Logo from "../../../assets/Logo/Logo";
import { UserSearch } from "../..";
import { Link } from "react-router-dom";
import "./Header.css";
import ProfileICon from "../../../assets/Svg/Profile";

const Header = () => {
  return (
    <div className="headerParent-container">
      <div className="headerChild">
        <div className="logContainr">
          <Logo />
        </div>
        <UserSearch />
        <div className="navLinks">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/home">
            <p>About</p>
          </Link>
          <Link to="/home">
            <p>Contact</p>
          </Link>
          <div className="profileIcon">
            <Link to="/profile">
              <ProfileICon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
