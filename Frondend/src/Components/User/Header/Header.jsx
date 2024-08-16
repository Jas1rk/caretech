import React, { useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { UserSearch, Warning } from "../..";
import { Link, useNavigate } from "react-router-dom";
import ProfileICon from "../../../assets/Svg/Profile";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faClose , faHouse , faContactBook ,  faAddressCard , faUserCog} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const { usertoken, userData } = useSelector((state) => state.user);
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
        <div className="menuIcon">
          <FontAwesomeIcon icon={faBars} onClick={() => setMenu(true)} />
        </div>
      </div>
      {menu && (
        <div className="dropItem">
          <FontAwesomeIcon icon={faClose} className="close-menu" onClick={()=> setMenu(false)}/>
          <Link to="/" onClick={() => setMenu(false)} className="menu-link">
          <FontAwesomeIcon icon={faHouse} className="menu-icons"/>
            <p>Home</p>
          </Link>
          <Link to="/home" onClick={() => setMenu(false)} className="menu-link">
          <FontAwesomeIcon icon={faAddressCard} className="menu-icons"/> 
            <p>About</p>
          </Link>
          <Link to="/home" onClick={() => setMenu(false)} className="menu-link">
          <FontAwesomeIcon icon={faContactBook} className="menu-icons"/>
            <p>Contact</p>
          </Link>
          <p className="menu-link" onClick={handleProfile}>
            <FontAwesomeIcon icon={faUserCog} className="menu-icons"/>
            Profile</p>
        </div>
      )}
    </div>
  );
};

export default Header;
