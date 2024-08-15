import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo";
import Useform from "../../../Hooks/Useform";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Redux/User/UserThunk";
import "./Login.css";

const Login = () => {
  const [values, handleInput] = Useform({ email: "", password: "" });
  const { email, password } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(userLogin({ email, password, toast }))
      .unwrap()
      .then(() => {
        toast.success("Login successfull");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  return (
    <>
      <Toaster />
      <Logo />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleInput}
          />
          <button>Login</button>
        </form>
        <div className="forget-pass">
          <Link to="/forgetpassword" className="forgetLink">
            <p className="forgetpass">Forget password</p>
          </Link>
        </div>
        <div>
          <p className="dont-have-accound">
            Don't have an accound ?
            <Link to="/register" className="registerLink">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
