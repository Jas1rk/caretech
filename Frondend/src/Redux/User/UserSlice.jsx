import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";

const INITIAL_STATE = {
  userData: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null,

  token: sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { userData, token } = action.payload;
      state.userData = userData;
      state.token = token;
      sessionStorage.setItem("userData", JSON.stringify(userData));
      sessionStorage.setItem("token", JSON.stringify(token));
      console.log("userdata is herereeee==>>", userData);
    });
  },
});

export default userSlice.reducer;

export const userRegistration = async ({
  username,
  email,
  mobile,
  password,
  confirmPassword,
  toast,
}) => {
  username = username.trim();
  email = email.trim();
  mobile = mobile.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  const usernameRegex = /^[a-zA-Z\s]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const passwordRegex = /[a-zA-Z]/;

  if (
    username === "" ||
    email === "" ||
    mobile === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    toast.error("Please fill all the fields");
  } else if (!usernameRegex.test(username)) {
    toast.error("Please enter a valid username");
  } else if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email");
  } else if (!mobileRegex.test(mobile)) {
    toast.error("Please enter a valid mobile number");
  } else if (!passwordRegex.test(password)) {
    toast.error("Please enter a valid password");
  } else if (password.length < 6) {
    toast.error("Password must be atleast 6 characters long");
  } else if (password !== confirmPassword) {
    toast.error("Password and confirm password must be same");
  } else {
    const response = await axios.post(`${backendUrl}/register`, {
      email,
    });
    if (response.data === "userExist") {
      toast.error("User already exist");
    } else {
      return response.data;
    }
  }
};

export const verifyOTP = async ({
  otp,
  username,
  email,
  mobile,
  password,
  toast,
}) => {
  otp = otp.trim();
  if (otp === "") {
    toast.error("Please enter otp");
  } else {
    const response = await axios.post(`${backendUrl}/otp`, {
      otp,
      username,
      email,
      mobile,
      password,
    });
    if (response.data === "invalidOtp") {
      toast.error("Invalid OTP");
    } else {
      toast.success("Verification completed");
      return "userRegistered";
    }
  }
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password, toast }, { rejectWithValue }) => {
    email = email.trim();
    password = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
      toast.error("Please enter email and password");
      return rejectWithValue("Please enter email and password");
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter valid email");
      return rejectWithValue("Please enter Invalid email");
    } else {
      const response = await axios.post(`${backendUrl}/login`, {
        email,
        password,
      });
      if (response.data === "userNotFound") {
        toast.error("User does not exist ! Please sign up");
        return rejectWithValue("User does not exist ! Please sign up");
      } else if (response.data === "userBlocked") {
        toast.error("Your account is blocked ! Please contact admin");
        return rejectWithValue(
          "Your account is blocked ! Please contact admin"
        );
      } else if (response.data === "invalidPassword") {
        toast.error("Invalid password");
        return rejectWithValue("Invalid password");
      } else {
        return response.data;
      }
    }
  }
);

export const userForgetPassword = async ({ email, toast }) => {
  email = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    toast.error("Please enter email");
  } else if (!emailRegex.test(email)) {
    toast.error("Please enter valid email");
  } else {
    const response = await axios.post(`${backendUrl}/forgetPassword`, {
      email,
    });
    if(response.data === 'emailNotFound'){
      toast.error('Email not found Try again')
    }else{
      return response.data
    }
  }
};
