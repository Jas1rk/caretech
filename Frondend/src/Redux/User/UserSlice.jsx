import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";

const INITIAL_STATE = {};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
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
