import React from "react";
import { AdminNavbar, AdminSidebar } from "../../Components";
import "../../assets/CommenStyles/adminStyle.css";

const AdminHomePage = () => {
  return (
    <div className="adminHome-parent">
      <AdminNavbar />
      <AdminSidebar />
    </div>
  );
};

export default AdminHomePage;
