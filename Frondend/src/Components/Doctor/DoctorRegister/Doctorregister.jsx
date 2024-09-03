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
import { doctValidationSchema ,doctorInitialValues} from "./Doctorvalidation";



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

  const handleSubmit = async (values) => {
    try {
      const {data} = await axios.post(
        `${backendUrl}/doctor/doctorregister`,{
          drName: values.doctorName,
          drDegree: values.lastName,
          drEmail: values.doctorEmail,
          drMobile: values.doctorMobile,
          drPassword: values.doctorPass,
          drCat: values.specialization,
          certificate: values.certificate,
        }
      );

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
              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <div className="flex flex-col w-3/4 justify-center m-auto items-center sm:w-2/1 pr-4 shadow-2xl rounded-3xl p-5">
                  {inputFieldsLeft.map((field, index) => (
                    <div
                      className=" flex flex-col justify-center ite sm:flex sm:flex-col mb-3"
                      key={index}
                    >
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

                <div className=" flex flex-col w-3/4 justify-center m-auto items-center sm:w-2/1  shadow-2xl rounded-3xl p-8">
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
                          className="m-5 w-36 h-36 object-cover rounded-lg shadow-lg "
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
