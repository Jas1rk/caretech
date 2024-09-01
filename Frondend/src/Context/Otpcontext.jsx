import React, { createContext, useContext, useState } from "react";

const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <OtpContext.Provider value={{ otpSent, setOtpSent }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => useContext(OtpContext);
