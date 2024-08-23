import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Logo from "../../../assets/Logo/Logo";
import { Formik, useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (Object.values(values.otp).some((data) => data === "")) {
    errors.otp = "This field is required";
  }
  return errors;
};

const Doctorotp = () => {
  const inputRef = useRef({});

  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill(""),
    },
    validate,
    onSubmit: (values) => {
      console.log("values are getting", values.otp.join(""));
    },
  });

  console.log(formik.values);

  useEffect(() => {
    inputRef.current[0].focus();
    inputRef.current[0].addEventListener("paste", pasteOtp);
    return () => inputRef.current[0].removeEventListener("paste", pasteOtp);
  }, []);

  const pasteOtp = (event) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 6);
    const currentOtp = [...formik.values.otp];
    pasteData.split("").forEach((char, index) => {
      currentOtp[index] = char;
    });
    formik.setFieldValue("otp", currentOtp);
    inputRef.current[Math.min(pasteData.length, 5)].focus();
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (/[a-z]/gi.test(value)) {
      toast.error("Please enter valid number");
    } else {
      const currentOtp = [...formik.values.otp];
      currentOtp[index] = value.slice(-1);
      formik.setValues((prev) => ({
        ...prev,
        otp: currentOtp,
      }));
      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleBack = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = () => {
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={value}
        name={index}
        className="w-16 h-12 md:w-16 md:h-12  bg-white border  border-solid   outline-none rounded-lg text-center mr-3 md:mr-3 text-lg md:text-xl focus:ring-1"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBack(event, index)}
      />
    ));
  };
  return (
    <>
      <Logo className="mb-8" />
      <div className="bg-white flex flex-col justify-center items-center w-40 md:w-64 sm:w-80 lg:w-96  m-auto border rounded-3xl md:p-5  shadow-lg">
        <h1 className="text-2xl font-bold p-5">Enter OTP</h1>
        <Formik>
          <div className="p-2 lg:p-15">{renderInput()}</div>
        </Formik>
        {formik.errors.otp && (
          <p className="mt-3 text-sm text-red-500">Please fill the fields</p>
        )}
        <button
          className="bg-gradient-to-r from-teal-700 to-blue-900 w-20 md:w-32 sm:w-32 p-1 rounded-3xl mt-3 text-stone-100 transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
          onClick={formik.handleSubmit}
          type="button"
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default Doctorotp;
