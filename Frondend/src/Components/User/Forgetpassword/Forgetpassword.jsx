import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import Useform from "../../../Hooks/Useform";
import { userForgetPassword } from "../../../Redux/User/UserThunk";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../../../service/backendUrl";
import { useNavigate } from "react-router-dom";
import "./Forgetpassword.css";

const Forgetpassword = () => {
  const [timer, setTimer] = useState(60);
  const [isResend, setIsResend] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [values, handleInput, setValues] = Useform({
    email: "",
    otp: "",
    newPassword: "",
    reNewPassword: "",
  });
  const { email, otp, newPassword, reNewPassword } = values;
  const navigate = useNavigate();

  useEffect(() => {
    let countDown;
    if (timer > 0 && isOTPSent) {
      countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResend(true);
    }
    return () => clearInterval(countDown);
  }, [timer, isOTPSent]);

  const handleSendOTP = async () => {
    const response = await userForgetPassword({ email, toast });
    if (response) {
      toast.success("OTP has sent to your mail ! check");
      setIsOTPSent(true);
      setTimer(60);
      setIsResend(false);
    } else {
      setValues({ email: "" });
    }
  };

  const handleResendOTP = async () => {
    setIsResend(false);
    setTimer(60);
    await axios.post(`${backendUrl}/forgetPassResendotp`, { email });
  };

  const handleVerifyOTP = async () => {
    try {
      if (otp.trim() === "") {
        toast.error("Please enter otp");
      } else {
        const response = await axios.post(`${backendUrl}/forgetPassOtp`, {
          email,
          otp,
        });
        if (response.data === "otpCorrect") {
          setIsOTPVerified(true);
          setValues({ ...values, otp: "" });
        } else if (response.data === "incorrectOtp") {
          toast.error("Incorrect OTP. Please try again.");
          setValues({ ...values, otp: "" });
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleNewPassword = async () => {
    const newpasswordRegex = /[a-zA-Z]/;
    if (newPassword.trim() === "" || reNewPassword.trim() === "") {
      toast.error("Please fill fields");
    } else if (!newpasswordRegex.test(newPassword)) {
      toast.error(
        "Password must contain alphabet ,number,symbol,and capital letters"
      );
    } else if (newPassword.length < 6) {
      toast.error("Password must be 6 characters long");
    } else if (newPassword !== reNewPassword) {
      toast.error("Password and confirm password must be same");
    } else {
      const response = await axios.post(`${backendUrl}/newPassword`, {
        email,
        newPassword,
      });
      if (response) {
        toast.success("password updated successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <>
      <Toaster />
      <Logo />
      <div className="forget-container">
        <h2>Recover Password</h2>
        <div className="email-container">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            placeholder="Enter email"
          />
          <button onClick={handleSendOTP}>Send OTP</button>
        </div>

        {isOTPSent && !isOTPVerified && (
          <>
            <p className="otp-row">Enter your OTP</p>
            <div className="otpContainer">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleInput}
                placeholder="Enter OTP"
              />
              {!isResend ? (
                <button className="verify-otp" onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              ) : (
                <button className="resend-otp" onClick={handleResendOTP}>
                  Resend OTP
                </button>
              )}
            </div>
            <p>Timer: {`00:${timer}`}</p>
          </>
        )}
        {isOTPVerified && (
          <>
            <p className="password-row">Enter your new password</p>
            <div className="password-container">
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleInput}
                placeholder="Enter new password"
              />
              <input
                type="password"
                name="reNewPassword"
                value={reNewPassword}
                onChange={handleInput}
                placeholder="Re-enter password"
              />
              <button onClick={handleNewPassword}>Continue</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Forgetpassword;
