import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userProfileEdit } from "./UserThunk";

const INITIAL_STATE = {
  userData: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null,

  usertoken: sessionStorage.getItem("usertoken")
    ? JSON.parse(sessionStorage.getItem("usertoken"))
    : null,
};

const userSlice = createSlice({
  name: "user",
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
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        const { userData, usertoken } = action.payload;
        state.userData = userData;
        state.usertoken = usertoken;
        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("usertoken", JSON.stringify(usertoken));
      })
      .addCase(userProfileEdit.fulfilled, (state, action) => {
        console.log("=======",action.payload)
        const { username, mobile, profileImage } = action.payload;
        state.userData.username = username;
        state.userData.mobile = mobile;
        if (profileImage) {
          state.userData.profileImage = profileImage;
        }
        state.editConfirm = true;
        sessionStorage.setItem("userData", JSON.stringify(state.userData));
      });
  },
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
