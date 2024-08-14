import React from "react";
import Logo from "../../../assets/Logo/Logo";
import { UserSearch, Warning } from "../..";
import { Link, useNavigate } from "react-router-dom";
import ProfileICon from "../../../assets/Svg/Profile";
import { useSelector } from "react-redux";
import dummyImgae from "../../../assets/Public/dummy.jpg";
import "./Header.css";

const Header = () => {
  const { usertoken, userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleProfile = () => {
    if (!usertoken) {
      Warning().then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate("/profile");
    }
  };
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
          <div className="profileIcon" onClick={handleProfile}>
            {userData && userData.profileImage ? (
              <img
              src={`../src/assets/images/${userData.profileImage}`}
                alt="profileimage"
                className="userDataProfileImage"
              />
            ) : (
              <ProfileICon />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
