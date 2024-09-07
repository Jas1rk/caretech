import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Fileupload from "../../../assets/Svg/Fileupload";
import { useDispatch, useSelector } from "react-redux";
import { findAllCatgory } from "../../../Redux/User/UserThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../../service/backendUrl";
import { toast } from "sonner";
import { doctValidationSchema, doctorInitialValues } from "./Doctorvalidation";

const Doctorregister = () => {
  const inputFieldsLeft = [
    { type: "text", name: "doctorName", placeholder: "Enter Your Name" },
    { type: "text", name: "lastName", placeholder: "Enter your dgree" },
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

  const handleProfileFile = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("profile", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfile(null);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`${backendUrl}/doctor/doctorregister`, {
        drName: values.doctorName,
        drDegree: values.lastName,
        drEmail: values.doctorEmail,
        drMobile: values.doctorMobile,
        drPassword: values.doctorPass,
        drCat: values.specialization,
        certificate: values.certificate,
      });

      if (data === "doctorExist") {
        toast.error("You're already exist in caretech family Please login");
      } else {
        toast.success("Otp has been sent to your mail please check");
        navigate("/doctor/doctorotp", {
          state: {
            drName: values.doctorName,
            drDegree: values.lastName,
            drEmail: values.doctorEmail,
            drMobile: values.doctorMobile,
            drPassword: values.doctorPass,
            drCat: values.specialization,
            certificate: values.certificate,
          },
        });
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const categoryData = useSelector((state) => state.user.homeCategories);
  const dispatch = useDispatch();
  const [certificate, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState(false);

  const handleNext = () => {
    setAbout(true);
  };

  useEffect(() => {
    dispatch(findAllCatgory());
  }, [dispatch]);

  return (
    <>
      <Logo />
      <h2 className="flex justify-center items-center font-bold text-2xl">
        Doctor Register
      </h2>
      <div className="m-10 flex  justify-center items-center">
        <Formik
          initialValues={doctorInitialValues}
          validationSchema={doctValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form>
              <div className="flex justify-center items-center gap-3">
                <div className="flex flex-col w-[302px] justify-center m-auto items-center  shadow-2xl rounded-3xl p-6">
                  {inputFieldsLeft.map((field, index) => (
                    <div
                      className=" flex flex-col justify-center ite sm:flex sm:flex-col m-1"
                      key={index}
                    >
                      <Field
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-600 text-sm font-bold"
                      />
                    </div>
                  ))}
                </div>

                {about && (
                  <div className=" flex flex-col w-3/4 justify-center m-auto items-center sm:w-2/1  shadow-2xl rounded-3xl p-8">
                    <div className="flex flex-col">
                      <p className="font-bold">Profile</p>
                      <input
                        type="file"
                        id="file"
                        className="w-full shadow-2xl border rounded-md text-sm"
                        onChange={(event) => {
                          handleProfileFile(event, setFieldValue);
                        }}
                      />
                      {errors.profile && touched.profile && (
                        <div className="text-red-600 text-sm font-bold mt-1">
                          {errors.profile}
                        </div>
                      )}
                      <div className="certicate flex justify-center items-center ">
                        {profile && (
                          <>
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="w-2 h-2 bg-slate-400 rounded-full p-2 absolute cursor-pointer "
                              onClick={() => setProfile(!profile)}
                            />

                            <img
                              src={profile}
                              alt="profile"
                              className="m-5 w-[24%] h-[4rem] object-cover rounded-full shadow-lg "
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <div className="flex flex-col mb-3">
                        <input
                          type="number"
                          name="experience"
                          placeholder="Years of Experience"
                          className="experience justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                        />
                        <ErrorMessage
                          name="experience"
                          component="div"
                          className="text-red-600 text-sm font-bold"
                        />
                      </div>

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
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <div className="flex flex-col">
                        <p className="font-bold">Upload Your Certificate</p>
                        <Fileupload certificate />
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
                    </div>

                    <div className="certicate flex justify-center items-center ">
                      {certificate && (
                        <>
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="w-4 h-4 bg-slate-400 rounded-full p-2 absolute cursor-pointer "
                            onClick={() => setImage(!certificate)}
                          />

                          <img
                            src={certificate}
                            alt="Certificate"
                            className="m-5 w-28 h-28 object-cover rounded-lg shadow-lg "
                          />
                        </>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-center items-center gap-3 m-2">
                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="State"
                            name="State"
                            className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                          />
                          <ErrorMessage
                            name="State"
                            component="div"
                            className="text-red-600 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="Country"
                            placeholder="Country"
                            className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                          />
                          <ErrorMessage
                            name="Country"
                            component="div"
                            className="text-red-600 text-sm font-bold"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-3">
                        <div>
                          <input
                            type="text"
                            name="Location"
                            placeholder="Location"
                            className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                          />
                          <ErrorMessage
                            name="Location"
                            component="div"
                            className="text-red-600 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <textarea
                            type="text"
                            name="aboutyou"
                            placeholder="About you"
                            className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-56"
                          />
                          <ErrorMessage
                            name="aboutyou"
                            component="div"
                            className="text-red-600 text-sm font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center items-center mt-1">
                {about ? (
                  <button
                    className="bg-slate-800 text-white p-1 rounded-md"
                    onClick={() => setAbout(false)}
                  >
                    back
                  </button>
                ) : (
                  <button
                    className="bg-slate-800 text-white p-1 rounded-md"
                    onClick={() => handleNext()}
                  >
                    Next
                  </button>
                )}
              </div>
              {about && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: "16px" }}
                  className="flex justify-center items-center m-auto  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-2 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                >
                  Register
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <p className="mb-3 text-base flex justify-center items-center">
        Already have an Accound ?
        <Link
          to="/doctor/doctorlogin"
          className="cursor-pointer hover:underline hover:text-slate-500 ml-2"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default Doctorregister;
