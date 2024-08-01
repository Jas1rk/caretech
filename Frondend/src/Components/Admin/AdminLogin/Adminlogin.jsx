import React from "react";
import Logo from "../../../assets/Logo/Logo";
import Useform from "../../../Hooks/Useform";
import toast, { Toaster } from "react-hot-toast";
import { adminLogin } from "../../../Redux/Admin/AdminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";

const Adminlogin = () => {
  const [values, handleInput] = Useform({ email: "", password: "" });
  const { email, password } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogin = (event) => {
    event.preventDefault();
    dispatch(adminLogin({ email, password, toast }))
      .unwrap()
      .then(() => {
        toast.success("Admin Login Successfull");
        setTimeout(() => {
          navigate("/admin/adminhome");
        }, 2000);
      });
  };

  return (
    <>
      <Toaster />
      <div className="adminLogoContainer">
        <Logo />
      </div>
      <div className="admin-login-continer">
        <h2 className="admin-login-title">Admin Login</h2>
        <form className="admin-login-formContainer" onSubmit={handleAdminLogin}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            placeholder="Enter email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            placeholder="Enter password"
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Adminlogin;
