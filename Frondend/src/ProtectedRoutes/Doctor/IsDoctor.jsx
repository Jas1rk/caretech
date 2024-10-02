import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsDoctor = ({ children }) => {
    
  const navigate = useNavigate();
  const { isAuthDoctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (!isAuthDoctor) {
      navigate("/doctor/doctorlogin");
    }
  }, [isAuthDoctor,navigate]);

  if (isAuthDoctor) return children;
};

export default IsDoctor;
