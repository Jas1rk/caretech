import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHomeDoctors,
  findAllCatgory,
  userLogin,
  userProfileEdit,
} from "./UserThunk";

const INITIAL_STATE = {
  userData: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null,
  isAuthUser: sessionStorage.getItem("userData") ? true : false,
  homeCategories: [],
  homeDoctors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
      state.isAuthUser = false;
      sessionStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        const userData = action.payload;
        state.userData = userData;
        state.isAuthUser = true;
        sessionStorage.setItem("userData", JSON.stringify(userData));
      })
      .addCase(userProfileEdit.fulfilled, (state, action) => {
        const { username, mobile, profileImage } = action.payload;
        state.userData.username = username;
        state.userData.mobile = mobile;
        if (profileImage) {
          state.userData.profileImage = profileImage;
        }
        state.editConfirm = true;
        sessionStorage.setItem("userData", JSON.stringify(state.userData));
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
