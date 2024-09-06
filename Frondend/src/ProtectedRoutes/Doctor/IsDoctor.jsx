import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsDoctor = ({ children }) => {
    
  const navigate = useNavigate();
  const { doctorToken } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (!doctorToken) {
      navigate("/doctor/doctorlogin");
    }
  }, []);

  if (doctorToken) return children;
};

export default IsDoctor;
