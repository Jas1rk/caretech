import React, { useEffect, useState } from "react";
import "./Forgetpassword.css";
import Logo from "../../../assets/Logo/Logo";

const Forgetpassword = () => {
  const [timer, setTimer] = useState(10);
  const [isResend, setIsResend] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

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

  const handleSendOTP = () => {
    setIsOTPSent(true);
    setTimer(10);
    setIsResend(false);
  };

  const handleVerifyOTP = () => {
    setIsOTPVerified(true);
  };

  return (
    <>
    <Logo/>
    <div className="forget-container">
      <h2>Recover Password</h2>

      {!isOTPSent && (
        <div className="email-container">
          <input type="email" placeholder="Enter email" />
          <button onClick={handleSendOTP}>Send OTP</button>
        </div>
      )}

      {isOTPSent && !isOTPVerified && (
        <>
          <p className="otp-row">Enter your OTP</p>
          <div className="otpContainer">
            <input type="text" placeholder="Enter OTP" />
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
            <input type="password" placeholder="Enter new password" />
            <input type="password" placeholder="Re-enter password" />
            <button>Continue</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Forgetpassword;
