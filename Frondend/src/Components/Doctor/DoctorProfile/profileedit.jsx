import React, { useState } from "react";
import { useFormik } from "formik";
import { validationEditProfileSchema } from "./validationeditprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { profileEditDoctor } from "../../../Redux/Doctor/DoctorThunk";
import { useDispatch, useSelector } from "react-redux";
import { ImageCropper } from "../..";


const Profileedit = ({ closeModal, doctorId }) => {
  const dispatch = useDispatch();
  const { doctorData } = useSelector((state) => state.doctor);
  const [profile, setProfile] = useState(false);



  const formik = useFormik({
    initialValues: {
      doctorname: doctorData.drname || "",
      doctormobile: doctorData.drMobile || "",
      doctorstate: doctorData.state || "",
      doctorcountry: doctorData.country || "",
      doctorlocation: doctorData.location || "",
      doctorexperience: doctorData.experience || "",
      doctordescription: doctorData.about || "",
      doctorprofile: null,
    },
    validationSchema: validationEditProfileSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append("doctorId", doctorId);
      await dispatch(profileEditDoctor({ formData, values, toast }))
        .unwrap()
        .then(() => {
          toast.success("Profile updated successfully");
          closeModal();
        });
    },
  });

  const handleProfile = (event) => {
    const file = event.target.files[0];
    if (file.type === "image/jpeg") {
      setProfile(file)
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("JPG image only support");
    }
  };

  const handleCropcomplete = (croppedimage,originalFile) => {
    const byteString = atob(croppedimage.split(',')[1])
    const mimeString = croppedimage.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new File([ab], originalFile, { type: mimeString });
    formik.setFieldValue("doctorprofile", file);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[80%] sm:w-[500px] relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="sm:flex gap-10 m-1">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Jasir"
                name="doctorname"
                value={formik.values.doctorname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctorname && formik.errors.doctorname ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctorname}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                name="doctormobile"
                value={formik.values.doctormobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="12345678"
                className=" justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctormobile && formik.errors.doctormobile ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctormobile}
                </div>
              ) : null}
            </div>
          </div>
          <div className="sm:flex gap-10 m-1">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="kerala"
                name="doctorstate"
                value={formik.values.doctorstate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctorstate && formik.errors.doctorstate ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctorstate}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="doctorcountry"
                value={formik.values.doctorcountry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="india"
                className=" justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctorcountry && formik.errors.doctorcountry ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctorcountry}
                </div>
              ) : null}
            </div>
          </div>
          <div className="sm:flex gap-10 m-1">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="kochi"
                name="doctorlocation"
                value={formik.values.doctorlocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctorlocation && formik.errors.doctorlocation ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctorlocation}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="number"
                name="doctorexperience"
                value={formik.values.doctorexperience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Experience"
                className=" justify-center items-center flex p-2  outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full sm:w-[120%]"
              />
              {formik.touched.doctorexperience ? (
                <div className="text-red-500 font-bold text-sm">
                  {formik.errors.doctorexperience}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <textarea
              name="doctordescription"
              value={formik.values.doctordescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="abot"
              className="p-2 justify-start items-start flex outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] focus:shadow-lg text-sm w-full"
            />
            {formik.touched.doctordescription &&
            formik.errors.doctordescription ? (
              <div className="text-red-500 font-bold text-sm">
                {formik.errors.doctordescription}
              </div>
            ) : null}
          </div>
          <div>
            <p className="font-bold">Profile image</p>
            <input
              type="file"
              className="w-full shadow-2xl border rounded-md text-sm mt-2"
              onChange={handleProfile}
            />

            <div className="certicate flex justify-center items-center ">
              {profile && (
                <>
                  <ImageCropper image={profile} onCropComplete={handleCropcomplete}  originalFileName={profile.name}/>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="w-2 h-2 bg-slate-400 rounded-full p-2 absolute cursor-pointer "
                    onClick={() => setProfile(false)}
                  />

                </>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center m-auto  cursor-pointer bg-gradient-to-r from-teal-700 to-blue-900 outline-none border-none p-1 rounded-3xl text-white w-32 transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
            style={{ marginTop: "10px" }}
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profileedit;
