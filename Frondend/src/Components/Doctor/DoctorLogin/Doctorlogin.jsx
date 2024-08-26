import React from "react";
import Logo from "../../../assets/Logo/Logo";
import { CommenInput } from "../..";
import Useform from "../../../Hooks/Useform";
import { Link } from "react-router-dom";

const Doctorlogin = () => {
  const [values, handleInput] = Useform({ email: "", password: "" });
  const inputFields = [
    { type: "email", name: "email", placeholder: "Enter email" },
    { type: "password", name: "password", placeholder: "Enter password" },
  ];

  const handleDoctorLogin = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Logo />
      <div className="flex justify-center items-center shadow-lg w-40 m-auto rounded-3xl flex-col">
        <h2 className="font-bold text-lg">Doctor Login</h2>
        <form
          className="flex flex-col items-center mt-2 m-10"
          onClick={(event) => handleDoctorLogin(event)}
        >
          {inputFields.map((field, index) => (
            <CommenInput
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
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
        <p className="mb-3 text-base ">
          Don't have an accound ?
          <Link
            to="/doctor/doctorregister"
            className="cursor-pointer hover:underline hover:text-slate-500 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Doctorlogin;
