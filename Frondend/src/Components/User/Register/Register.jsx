import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo";
import toast, { Toaster } from "react-hot-toast";
import Useform from "../../../Hooks/Useform";
import { userRegistration } from "../../../Redux/User/UserThunk";
import "./Register.css";

const Register = () => {
  const [values, handleInput] = Useform({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, mobile, password, confirmPassword } = values;
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const response = await userRegistration({
      username,
      email,
      mobile,
      password,
      confirmPassword,
      toast,
    });
    if (response) {
      navigate("/otp", { state: { username, email, mobile, password } });
    }
  };

  return (
    <>
      <Toaster />
      <Logo />
      <div className="register-container">
        <h2 className="text-2xl font-bold">Register</h2>
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
          />
          <input
            type="number"
            name="mobile"
            placeholder="Mobile"
            value={mobile}
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInput}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleInput}
          />
          <button>Register</button>
        </form>
        <div>
          <p className="toSignup">
            Already have an accound ?
            <Link to="/login" className="loginLink">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
