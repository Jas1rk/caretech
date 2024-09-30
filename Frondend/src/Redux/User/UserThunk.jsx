import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";
import user_Api from "../../service/Userinstance";

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
      console.log("ogin data",response.data)
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
    if (response.data === "emailNotFound") {
      toast.error("Email not found Try again");
    } else {
      return response.data;
    }
  }
};

export const userProfileEdit = createAsyncThunk(
  "user/userProfileEdit",
  async (
    { formData, username, mobile, profileImage, toast },
    { rejectWithValue }
  ) => {
    try {
      username = username.trim();
      // mobile = mobile.trim();

      const usernameRegex = /^[a-zA-Z\s]{3,20}$/;
      const mobileRegex = /^[6-9]\d{9}$/;

      if (username === "" || mobile === "") {
        toast.error("Please fill all the fields");
        return rejectWithValue({
          status: 400,
          message: "Please fill all the fields",
        });
      } else if (!usernameRegex.test(username)) {
        toast.error(
          "Username must be 3 to 20 characters long and can only contain letters"
        );
        return rejectWithValue({
          status: 400,
          message:
            "Username must be 3 to 20 characters long and can only contain letters",
        });
      } else if (!mobileRegex.test(mobile)) {
        toast.error("Invalid mobile number");
        return rejectWithValue({
          status: 400,
          message: "Invalid mobile number",
        });
      } else {
        const response = await user_Api.post("/editProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (
          response.data.acknowledged === true ||
          response.data.modifiedCount == 1
        ) {
          toast.success("Profile updated successfully");
          return {
            username,
            mobile,
            ...(profileImage && { profileImage: profileImage.name }),
          };
        } else {
          toast.error("Failed to update profile");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
);

export const findAllCatgory = createAsyncThunk(
  "user/findAllCategoy",
  async () => {
    const { data } = await axios.get(`${backendUrl}/categories`);
    return data;
  }
);

export const fetchHomeDoctors = createAsyncThunk(
  "user/fetchHomeDoctors",
  async () => {
    const { data } = await axios.get(`${backendUrl}/doctors`);
    return data;
  }
);
