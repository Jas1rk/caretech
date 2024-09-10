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

  const handleFile = (event, setFieldValue, type) => {
    const file = event.target.files[0];
    if (!file) {
      type === "certificate" ? setImage(null) : setProfile(null);
      return;
    }
    if (type === "profile" && file.type !== "image/jpeg") {
      toast.error("Please upload only jpg image");
      event.target.value = "";
      return;
    }

    setFieldValue(type, file);
    const reader = new FileReader();
    reader.onload = () => {
      type === "certificate"
        ? setImage(reader.result)
        : setProfile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    console.log("here are the values", values);
    try {
      const { data } = await axios.post(`${backendUrl}/doctor/doctorregister`, {
        drName: values.doctorName,
        drDegree: values.lastName,
        drEmail: values.doctorEmail,
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
            profile: values.profile,
            drExperience: values.experience,
            drState: values.State,
            drCountry: values.Country,
            drLocation: values.Location,
            drAbout: values.aboutyou,
          },
        });
        return data;
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const navigate = useNavigate();
  const categoryData = useSelector((state) => state.user.homeCategories);
  const dispatch = useDispatch();
  const [certificate, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    dispatch(findAllCatgory());
  }, [dispatch]);

  const hadleDiscard = (event, type) => {
    const resetData = {
      profile: setProfile,
      certificate: setImage,
    };
    resetData[type](null);
    event.target.value = "";
  };

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
                        className="w-full shadow-2xl border rounded-md text-sm"
                        onChange={(event) => {
                          handleFile(event, setFieldValue, "profile");
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
                              onClick={(event) =>
                                hadleDiscard(event, "profile")
                              }
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
                        <Field
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
                            handleFile(event, setFieldValue, "certificate");
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
                            onClick={(event) =>
                              hadleDiscard(event, "certificate")
                            }
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
                            as="textarea"
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
      <div className="w-full flex justify-center items-center mt-1">
        {about ? (
          <button
            className="bg-slate-800 text-white p-1 rounded-md "
            onClick={() => setAbout(false)}
          >
            back
          </button>
        ) : (
          <button
            type="button"
            className="bg-slate-800 text-white p-1 rounded-md"
            onClick={() => setAbout(true)}
          >
            Next
          </button>
        )}
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
