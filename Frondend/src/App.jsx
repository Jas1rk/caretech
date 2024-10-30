import {
  Register,
  Otp,
  Login,
  Forgetpassword,
  AdminLogin,
  AdminUserList,
  Userprofile,
  AdminCategory,
  DoctorLogin,
  DoctorOtp,
  DoctorRegister,
  AdminDoctorList,
  DoctorProfile,
  DoctorDetails,
  DoctorSloatAllocation,
  Error404,
} from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/User/Home";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import IsUser from "./ProtectedRoutes/User/IsUser";
import IsAdmin from "./ProtectedRoutes/Admin/IsAdmin";
import IsDoctor from "./ProtectedRoutes/Doctor/IsDoctor";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { backendUrl } from "./service/backendUrl";
import { disconnectSocket, setSocket } from "./Redux/SocketClient/Socketclient";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(backendUrl);
    dispatch(setSocket(socket));

    return () => {
      socket.disconnect();
      dispatch(disconnectSocket());
    };
  }, [dispatch]);
  
  return (
    <>
      <Router>
        <Routes>
          {/* userRoute */}
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

          {/* adminRoute */}
          <Route path="/admin/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admin/adminhome"
            element={
              <IsAdmin>
                <AdminHomePage />
              </IsAdmin>
            }
          />
          <Route
            path="/admin/userlist"
            element={
              <IsAdmin>
                <AdminUserList />
              </IsAdmin>
            }
          />
          <Route
            path="/admin/admincategory"
            element={
              <IsAdmin>
                <AdminCategory />
              </IsAdmin>
            }
          />
          <Route
            path="/admin/doctorlist"
            element={
              <IsAdmin>
                <AdminDoctorList />
              </IsAdmin>
            }
          />

          {/* /// doctorRoute */}
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

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
