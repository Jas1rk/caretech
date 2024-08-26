import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo";
import Useform from "../../../Hooks/Useform";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Redux/User/UserThunk";
import { CommenInput } from "../..";


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

  const inputFields = [
    { type: "email", name: "email", placeholder: "Enter email" },
    { type: "password", name: "password", placeholder: "Enter password" },
  ];

  return (
    <>
      <Logo />
      <div className="flex flex-col justify-center items-center w-40 m-auto p-3  shadow-2xl rounded-3xl bg-white">
        <h2 className="text-2xl font-medium">Login</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center mt-2 m-10"
        >
          {inputFields.map((field, index) => (
            <CommenInput
              key={index}
              type={field.type}
              name={field.name}
              values={values[field.name]}
              handleInput={handleInput}
              placeholder={field.placeholder}
              onChange={handleInput}
            />
          ))}
          <button className="mt-5 cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2x">
            Login
          </button>
        </form>

        <Link
          to="/forgetpassword"
          className="cursor-pointer hover:underline hover:text-slate-500"
        >
          <p className="mb-4">Forget password</p>
        </Link>

        <p>
          Don't have an accound ?
          <Link
            to="/register"
            className="cursor-pointer hover:underline hover:text-slate-500"
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
