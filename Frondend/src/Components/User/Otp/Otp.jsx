import React, { useEffect, useState } from "react";
import "./Otp.css";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const [timer, setTimer] = useState(60);
  const [isResend, setIsResend] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()

  const { username, email, mobile, password } = location.state || {}
  console.log(username, email, mobile, password,'here got')

  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countDown);
    } else {
      setIsResend(true);
    }
  },[timer]);

  return (
    <div className="otp-container">
      <h2>OTP</h2>
      <form>
        <input type="text" placeholder="Enter otp" />
        {!isResend ? <button>Veriy OTP</button> : <button>Resend OTP</button>}
      </form>
      <p>Timer:{`00:${timer}`}</p>
    </div>
  );
};

export default Otp;
