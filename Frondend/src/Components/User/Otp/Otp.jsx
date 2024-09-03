import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../../Redux/User/UserThunk";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../../../service/backendUrl";
import Logo from "../../../assets/Logo/Logo";
import "./Otp.css";

const Otp = () => {
  const [timer, setTimer] = useState(60);
  const [isResend, setIsResend] = useState(false);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { username, email, mobile, password } = location.state || {};

  useEffect(() => {   
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countDown);
    } else {
      toast.error("Time ended!Please resend");
      setIsResend(true);
    }
  }, [timer]);

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    const response = await verifyOTP({
      otp,
      username,
      email,
      mobile,
      password,
      toast,
    });
    if (response === "userRegistered") {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    setOtp("");
  };

  const handleResend = async (event) => {
    event.preventDefault();
    setIsResend(false);
    setTimer(60);
    await axios.post(`${backendUrl}/resendOtp`, { email });
  };

  return (
    <>
      <Toaster />
      <Logo />
      <div className="otp-container">
        <h2>OTP</h2>
        <form>
          <input
            type="text"
            placeholder="Enter otp"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          {!isResend ? (
            <button onClick={handleVerifyOTP}>Veriy OTP</button>
          ) : (
            <button onClick={handleResend}>Resend OTP</button>
          )}
        </form>
        <p className="verify-otp-timer">Timer:{`00:${timer}`}</p>
      </div>
    </>
  );
};

export default Otp;
