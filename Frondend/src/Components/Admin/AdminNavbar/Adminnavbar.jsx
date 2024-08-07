import React from "react";
import Logo from "../../../assets/Logo/Logo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Redux/Admin/AdminSlice";
import "./Adminnavbar.css";

const Adminnavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/adminlogin");
  };

  return (
    <>
      <div className="admin-navbar">
        <div className="admin-header-logoContainer">
          <Logo />
        </div>
        <button className="admin-logout-button" onClick={handleAdminLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Adminnavbar;
