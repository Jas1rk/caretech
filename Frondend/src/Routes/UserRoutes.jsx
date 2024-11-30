import { Route, Routes } from "react-router-dom";
import IsUser from "../ProtectedRoutes/User/IsUser";
import {
  Register,
  Otp,
  Login,
  Forgetpassword,
  Userprofile,
  DoctorDetails,
  BookingHistoryView,
} from "../Components";
import Home from "../Pages/User/Home";

const UserRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route
        path="/profile"
        element={
          <IsUser>
            <Userprofile />
          </IsUser>
        }
      />

      <Route path="/doctordetails" element={<DoctorDetails />} />
      <Route
        path="/booking-history"
        element={
          <IsUser>
            <BookingHistoryView />
          </IsUser>
        }
      />
    </>
  );
};

export default UserRoutes;
