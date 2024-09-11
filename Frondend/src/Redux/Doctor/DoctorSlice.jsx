import { createSlice } from "@reduxjs/toolkit";
import { doctorLogin } from "./DoctorThunk";

const INITIAL_STATE = {
  doctorData: sessionStorage.getItem("doctorData")
    ? JSON.parse(sessionStorage.getItem("doctorData"))
    : null,
  doctorToken: sessionStorage.getItem("doctor-token")
    ? JSON.parse(sessionStorage.getItem("doctor-token"))
    : null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState: INITIAL_STATE,
  reducers:{
    docorLogout:(state) => {
        state.doctorData = null;
        state.doctorToken = null;
        sessionStorage.removeItem("doctorData");
        sessionStorage.removeItem("doctor-token");  
    }
  },
  extraReducers: (builder) => {
    builder.addCase(doctorLogin.fulfilled, (state, action) => {
      const { doctorData, doctorToken } = action.payload;
      state.doctorData = doctorData
      state.doctorToken = doctorToken
      sessionStorage.setItem("doctorData",JSON.stringify(doctorData))
      sessionStorage.setItem("doctor-token",JSON.stringify(doctorToken))
    });
  },
});

export default doctorSlice.reducer;
export const {docorLogout} = doctorSlice.actions
