import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../../../assets/Logo/Logo";

const Register = () => {
  return (
    <>
    <Logo/>
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Mobile" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Register</button>
      </form>
      <div>
        <p>
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
