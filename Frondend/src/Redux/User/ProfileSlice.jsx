import { createSlice } from "@reduxjs/toolkit";

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
});

export const { userLogout } = profileSlice.actions;
export default profileSlice.reducer;