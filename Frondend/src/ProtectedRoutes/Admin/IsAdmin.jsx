import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthAdmin } = useSelector((state) => state.admin);
  
  useEffect(() => {
    if (!isAuthAdmin) {
      navigate("/admin/adminlogin");
    }
  }, [isAuthAdmin, navigate]);

  if (isAuthAdmin) {
    return children;
  }
};

export default IsAdmin;
