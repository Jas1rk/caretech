import React, { useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { UserSearch, Warning } from "../..";
import { Link, useNavigate } from "react-router-dom";
import ProfileICon from "../../../assets/Svg/Profile";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faHouse,
  faContactBook,
  faAddressCard,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const { usertoken, userData } = useSelector((state) => state.user);
  const { doctorToken, doctorData } = useSelector((state) => state.doctor);
  const [menu, setMenu] = useState(false);
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

  const handleDoctor = () => {
    if (!doctorToken) {
      Warning().then((result) => {
        if (result.isConfirmed) {
          navigate("/doctor/doctorlogin");
        }
      });
    }else{
      navigate("/doctor/doctorprofile")
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
          <Link to="/" className="navlink-a">
            <p>Home</p>
          </Link>
          <Link to="/home" className="navlink-a">
            <p>About</p>
          </Link>
          <Link to="/home" className="navlink-a">
            <p>Contact</p>
          </Link>
          <div
            className={`${usertoken ? "hidden" : "block cursor-pointer"}`}
            onClick={handleDoctor}
          >
            {doctorData && doctorData.profileimage ? (
              <img
                src={`../src/assets/images/${doctorData.profileimage}`}
                alt="profileimage"
                className="rounded-full w-9 h-9 border-2 border-[#136a8a] object-cover"
              />
            ) : (
              // <Link to="">
                <p  className="navlink-a">Join as Doctor</p>
              // {/* </Link> */}
            )}
          </div>
          <div
            onClick={handleProfile}
            className={`${doctorToken ? "hidden" : "block cursor-pointer"} `}
          >
            {userData && userData.profileImage ? (
              <img
                src={`../src/assets/images/${userData.profileImage}`}
                srcSet={`../src/assets/images/${userData.profileImage} 1x, ../src/assets/images/${userData.profileImage}@2x 2x`}
                alt="profileimage"
                className="rounded-3xl w-9 h-9 border-2 border-[#136a8a] object-cover"
              />
            ) : (
              <ProfileICon />
            )}
          </div>
        </div>
        <div className="menuIcon">
          <FontAwesomeIcon icon={faBars} onClick={() => setMenu(true)} />
        </div>
      </div>
      {menu && (
        <div className="dropItem">
          <FontAwesomeIcon
            icon={faClose}
            className="close-menu"
            onClick={() => setMenu(false)}
          />
          <Link to="/" onClick={() => setMenu(false)} className="menu-link">
            <FontAwesomeIcon icon={faHouse} className="menu-icons" />
            <p>Home</p>
          </Link>
          <Link to="/home" onClick={() => setMenu(false)} className="menu-link">
            <FontAwesomeIcon icon={faAddressCard} className="menu-icons" />
            <p>About</p>
          </Link>
          <Link to="/home" onClick={() => setMenu(false)} className="menu-link">
            <FontAwesomeIcon icon={faContactBook} className="menu-icons" />
            <p>Contact</p>
          </Link>
          <p className="menu-link" onClick={handleProfile}>
            <FontAwesomeIcon icon={faUserCog} className="menu-icons" />
            Profile
          </p>
          <Link to="/home" className="navlink-a">
            <p>Join as Doctor</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
