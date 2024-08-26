import React from "react";
import Logo from "../../../assets/Logo/Logo";
import { CommenInput } from "../..";
// import Useform from "../../../Hooks/Useform";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  doctorName: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  doctorEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  doctorMobile: Yup.string()
    .required("Mobile is required")
    .min(10, "Mobile must valid"),
  doctorPass: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  doctorConfimPass: Yup.string()
    .oneOf([Yup.ref("doctorPass"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Doctorregister = () => {
  const initialValues = {
    doctorName: "",
    doctorEmail: "",
    doctorMobile: "",
    doctorPass: "",
    doctorConfimPass: "",
  };

  const inputFields = [
    { type: "text", name: "doctorName", placeholder: "Enter Your Name" },
    { type: "email", name: "doctorEmail", placeholder: "Enter Your Email" },
    { type: "number", name: "doctorMobile", placeholder: "Enter Your Mobile" },
    {
      type: "password",
      name: "doctorPass",
      placeholder: "Enter Your Password",
    },
    {
      type: "password",
      name: "doctorConfimPass",
      placeholder: "Enter Your ConfimPassword",
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Logo />
      <h2 className="ml-4 font-bold text-2xl">Doctor Register</h2>
      <div className="m-10 flex gap-5 justify-center items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center items-center  w-40 rounded-2xl shadow-2xl p-4">
              {inputFields.map((field, index) => (
                <div className="flex flex-col mb-4" key={index}>
                  <Field
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="p-2 m-1 outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a]  focus:shadow-lg text-sm w-56"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600 text-sm font-bold ml-3"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center m-auto mt-5 cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2x"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="w-40 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          
        </div>
      </div>
    </>
  );
};

export default Doctorregister;
