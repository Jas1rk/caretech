import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
      <div className="forget-pass">
        <Link to="/forgetpassword" className="forgetLink">
          <p>Forget password</p>
        </Link>
      </div>
      <div >
        <p>
          Don't have an accound ?<Link to="/register" className="registerLink">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
