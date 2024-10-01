import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const IsUser = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthUser) {
      navigate("/login");
    }
  }, [isAuthUser, navigate]);

  if (isAuthUser) {
    return children;
  }
  return;
};

export default IsUser;
