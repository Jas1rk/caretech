import React from "react";
import {
  AdminLogin,
  AdminUserList,
  AdminCategory,
  AdminDoctorList,
} from "../Components";
import IsAdmin from "../ProtectedRoutes/Admin/IsAdmin";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <>
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
    </>
  );
};

export default AdminRoutes;
