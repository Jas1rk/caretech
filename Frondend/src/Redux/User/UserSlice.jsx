import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHomeDoctors,
  findAllCatgory,
  userLogin,
  userProfileEdit,
} from "./UserThunk";

const INITIAL_STATE = {
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
  homeCategories: [],
  homeDoctors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        const { userData } = action.payload;
        state.userData = userData;
        localStorage.setItem("userData", JSON.stringify(userData));
      })
      .addCase(userProfileEdit.fulfilled, (state, action) => {
        const { username, mobile, profileImage } = action.payload;
        state.userData.username = username;
        state.userData.mobile = mobile;
        if (profileImage) {
          state.userData.profileImage = profileImage;
        }
        state.editConfirm = true;
        localStorage.setItem("userData", JSON.stringify(state.userData));
      })
      .addCase(findAllCatgory.fulfilled, (state, action) => {
        const allCat = action.payload;
        state.homeCategories = allCat;
      })
      .addCase(fetchHomeDoctors.fulfilled, (state, action) => {
        const allDr = action.payload;
        state.homeDoctors = allDr;
      });
  },
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
