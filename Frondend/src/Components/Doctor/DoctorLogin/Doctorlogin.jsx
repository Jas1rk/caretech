import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { CommenInput } from "../..";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doctorLogin } from "../../../Redux/Doctor/DoctorThunk";

const validationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});

const Doctorlogin = () => {
  const location = useLocation();
  const [messege, setMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      AOS.init({ duration: 1000 });
      setMessage(true);

      const hideMsg = setTimeout(() => {
        setMessage(false);
      }, 5000);

      return () => clearTimeout(hideMsg);
    }
  }, [location.state?.message]);

  const inputFields = [
    { type: "email", name: "email", placeholder: "Enter email" },
    { type: "password", name: "password", placeholder: "Enter password" },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(
        doctorLogin({
          doctorEmail: values.email,
          doctorPass: values.password,
          toast,
        })
      );
    },
  });

  return (
    <>
      <Logo />
      {messege && (
        <div
          data-aos="fade-right"
          className="border border-green-500 p-2 rounded-md left-10 bg-white text-center z-10 absolute flex justify-center items-center flex-col m-auto w-[350px]"
        >
          <p className="mb-2">Your registration request has been submitted.</p>
          <p>
            Please await verification by the CareTech administration team. Once
            verified, you will be welcomed into the CareTech family.
          </p>
        </div>
      )}
      <div className="flex justify-center items-center shadow-lg w-40 m-auto rounded-3xl flex-col">
        <h2 className="font-bold text-lg">Doctor Login</h2>

        <form
          className="flex flex-col items-center m-5"
          onSubmit={formik.handleSubmit}
        >
          {inputFields.map((field, index) => (
            <div key={index} className="flex flex-col w-full">
              <CommenInput
                key={index}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div className="text-red-500 ml-4 font-bold text-sm">
                  {formik.errors[field.name]}
                </div>
              ) : null}
            </div>
          ))}
          <button
            type="submit"
            className="mt-5 cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2x"
          >
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
