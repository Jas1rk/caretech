import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.admin.adminToken)

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/adminlogin");
    }
  },[]);

  if (adminToken) {
    return children;
  }
};

export default IsAdmin;
