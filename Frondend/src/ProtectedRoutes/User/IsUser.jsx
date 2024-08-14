import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsUser = ({ children }) => {
  const navigate = useNavigate();
  const usertoken = useSelector((state) => state.user.usertoken);

  useEffect(() => {
    if (!usertoken) {
      navigate("/login");
    }
  }, []);

  if (usertoken) {
    return children;
  }
};

export default IsUser;
