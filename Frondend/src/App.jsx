import {
  Register,
  Otp,
  Login,
  Forgetpassword,
  AdminLogin,
  AdminUserList,
  Userprofile,
} from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/User/Home";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import IsUser from "./ProtectedRoutes/User/IsUser";
import IsAdmin from "./ProtectedRoutes/Admin/IsAdmin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/otp" element={<Otp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgetpassword" element={<Forgetpassword />} />
          <Route
            exact
            path="/profile"
            element={
              <IsUser>
                <Userprofile />
              </IsUser>
            }
          />
          <Route exact path="/admin/adminlogin" element={<AdminLogin />} />
          <Route
            exact
            path="/admin/adminhome"
            element={
              <IsAdmin>
                <AdminHomePage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/admin/userlist"
            element={
              <IsAdmin>
                <AdminUserList />
              </IsAdmin>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
