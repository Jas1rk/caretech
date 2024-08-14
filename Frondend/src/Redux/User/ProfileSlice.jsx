import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";

const INITIAL_STATE = {
  userData: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null,

  usertoken: sessionStorage.getItem("usertoken")
    ? JSON.parse(sessionStorage.getItem("usertoken"))
    : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: INITIAL_STATE,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
      state.usertoken = null;
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("usertoken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userProfileEdit.fulfilled, (state, action) => {
      const { username, mobile, image } = action.payload;
      state.userData.username = username;
      state.userData.mobile = mobile;
      if (image) {
        state.userData.image = image;
      }
      state.editConfirm = true;
      sessionStorage.setItem("userData", JSON.stringify(state.userData));
    });
  },
});

export const { userLogout } = profileSlice.actions;
export default profileSlice.reducer;

export const userProfileEdit = createAsyncThunk(
  "profile/userProfileEdit",
  async ({ formData, username, mobile, image, toast }, { rejectWithValue }) => {
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
        const usertoken = JSON.parse(sessionStorage.getItem("usertoken"));
        const response = await axios.post(
          `${backendUrl}/editProfile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${usertoken}`,
            },
          }
        );
        if ( response.data.modifiedCount == 1) {
          toast.success("Profile updated successfully");
          // return response.data;
          return {
            username,
            mobile,
            ...(image && { image: image.name }),
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
