import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Fileupload from "../../../assets/Svg/Fileupload";
import { useDispatch, useSelector } from "react-redux";
import { findAllCatgory } from "../../../Redux/User/UserThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
    .min(10, "Mobile must be 10 digits"),
  doctorPass: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  doctorConfimPass: Yup.string()
    .oneOf([Yup.ref("doctorPass"), null], "Passwords must match")
    .required("Confirm Password is required"),
  specialization: Yup.string().required("Specialization is required"),
  about: Yup.string().required("About section is required"),
  location: Yup.string().required("Location is required"),
  certificate: Yup.mixed().required("Certificate is required"),
});

const Doctorregister = () => {
  const initialValues = {
    doctorName: "",
    doctorEmail: "",
    doctorMobile: "",
    doctorPass: "",
    doctorConfimPass: "",
    specialization: "",
    about: "",
    location: "",
    certificate: null,
  };

  const inputFieldsLeft = [
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
      placeholder: "Enter Your Confirm Password",
    },
  ];

  const handleFile = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("certificate", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };


  const handleSubmit = (values) => {
    console.log("the entire values of formik",values)
     const {doctorName} = values
     console.log("here is doctor name",doctorName)
  };

  const categoryData = useSelector((state) => state.user.homeCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllCatgory());
  }, [dispatch]);

  const [certificate, setImage] = useState(null);

  return (
    <>
      <Logo />
      <h2 className="ml-60 font-bold text-2xl">Doctor Register</h2>
      <div className="m-10 flex  justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form>
              <div className="flex justify-center gap-6">
                <div className="flex flex-col w-1/2 pr-4 shadow-2xl rounded-3xl p-5">
                  {inputFieldsLeft.map((field, index) => (
                    <div className="flex flex-col mb-3 " key={index}>
                      <Field
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="justify-center items-center flex p-2 m-1 ml-6 outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-600 text-sm font-bold ml-6 mt-1"
                      />
                    </div>
                  ))}
                </div>

                <div className=" rounded-3xl shadow-2xl p-8">
                  <div className="flex justify-center items-center gap-7">
                    <div className="flex flex-col mb-3">
                      <Field
                        as="select"
                        name="specialization"
                        className="border p-2 rounded-md drop-shadow flex justify-start items-start cursor-pointer outline-none focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg"
                      >
                        <option value="" disabled>
                          Specialization
                        </option>
                        {categoryData.map((cat, index) => (
                          <option key={index} value={cat.name}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="specialization"
                        component="div"
                        className="text-red-600 text-sm font-bold ml-3"
                      />
                    </div>

                    <div className="flex flex-col mb-3">
                      <Field
                        as="textarea"
                        name="about"
                        placeholder="About you"
                        className="p-2 mt-3 outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm"
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-red-600 text-sm font-bold ml-3"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div className="flex flex-col mr-2">
                      <p className="font-bold">Upload Your Certificate</p>
                      <Fileupload />
                      <input
                        type="file"
                        id="file"
                        className="hidden"
                        onChange={(event) => {
                          handleFile(event, setFieldValue);
                        }}
                      />

                      {errors.certificate && touched.certificate && (
                        <div className="text-red-600 text-sm font-bold mt-1">
                          {errors.certificate}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Field
                        name="location"
                        placeholder="Location"
                        className="p-2 m-1 outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-600 text-sm font-bold ml-3"
                      />
                    </div>
                  </div>
                  <div className="certicate">
                    {certificate && (
                      <>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="w-4 h-4 bg-slate-400 rounded-full p-1 flex justify-center items-center absolute cursor-pointer ml-4 -mt-2"
                          onClick={() => setImage(!certificate)}
                        />

                        <img
                          src={certificate}
                          alt="Certificate"
                          className="m-5 w-36 h-36 object-cover rounded-lg shadow-lg"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: "16px" }}
                className="flex justify-center items-center m-auto  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Doctorregister;
