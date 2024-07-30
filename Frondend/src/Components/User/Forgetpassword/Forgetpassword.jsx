import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import Useform from "../../../Hooks/Useform";
import { userForgetPassword } from "../../../Redux/User/UserSlice";
import toast, { Toaster } from "react-hot-toast";
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
      setIsOTPSent(true);
      setTimer(60);
      setIsResend(false);
      setValues(email);
    } else {
      setValues({ email: "" });
    }
  };

  const handleVerifyOTP = () => {
    setIsOTPVerified(true);
    console.log("this is otp", otp);
  };

  const handleNewPassword = () => {
    console.log("new and re-pass", newPassword, reNewPassword);
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

        {isOTPSent && (
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
                <button className="resend-otp" onClick={handleSendOTP}>
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
