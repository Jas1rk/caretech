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
} from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/User/Home";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import IsUser from "./ProtectedRoutes/User/IsUser";
import IsAdmin from "./ProtectedRoutes/Admin/IsAdmin";
import IsDoctor from "./ProtectedRoutes/Doctor/IsDoctor"
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Router>
          <Routes>
                        {/* userRoute */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/otp" element={<Otp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgetpassword" element={<Forgetpassword />} />
            <Route exact path="/profile" element={<IsUser><Userprofile /></IsUser>} />

                    {/* adminRoute */}
            <Route exact path="/admin/adminlogin" element={<AdminLogin />} />
            <Route exact path="/admin/adminhome" element={<IsAdmin><AdminHomePage /></IsAdmin>}/>
            <Route exact path="/admin/userlist"element={<IsAdmin><AdminUserList /></IsAdmin>}/>
            <Route exact path="/admin/admincategory" element={<IsAdmin><AdminCategory /></IsAdmin>}/>
            <Route exact path="/admin/doctorlist" element={<IsAdmin><AdminDoctorList/></IsAdmin>}/>  
          
                 {/* /// doctorRoute */}
            <Route exact path="/doctor/doctorlogin" element={<DoctorLogin />} />
            <Route exact path="/doctor/doctorotp" element={<DoctorOtp />} />
            <Route exact path="/doctor/doctorregister"element={<DoctorRegister />} />
            <Route exact path="/doctor/doctorprofile" element={<IsDoctor><DoctorProfile/></IsDoctor>}/>
          </Routes>
 
      </Router>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
