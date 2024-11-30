import React from "react";
import {
  DoctorLogin,
  DoctorOtp,
  DoctorRegister,
  DoctorProfile,
  DoctorSloatAllocation,
  DoctorUsersBookingDetails,
} from "../Components";
import IsDoctor from "../ProtectedRoutes/Doctor/IsDoctor";
import { Routes, Route } from "react-router-dom";

const DoctorRoutes = () => {
  return (
    <>
      <Route path="/doctor/doctorlogin" element={<DoctorLogin />} />
      <Route path="/doctor/doctorotp" element={<DoctorOtp />} />
      <Route path="/doctor/doctorregister" element={<DoctorRegister />} />
      <Route
        path="/doctor/doctorprofile"
        element={
          <IsDoctor>
            <DoctorProfile />
          </IsDoctor>
        }
      />
      <Route
        path="/doctor/sloat-allocation"
        element={
          <IsDoctor>
            <DoctorSloatAllocation />
          </IsDoctor>
        }
      />
      <Route
        path="/doctor/booking-details"
        element={
          <IsDoctor>
            <DoctorUsersBookingDetails />
          </IsDoctor>
        }
      />
    </>
  );
};

export default DoctorRoutes;
