import { createSlice } from "@reduxjs/toolkit";
import { doctorLogin, profileEditDoctor } from "./DoctorThunk";

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
  reducers: {
    docorLogout: (state) => {
      state.doctorData = null;
      state.doctorToken = null;
      sessionStorage.removeItem("doctorData");
      sessionStorage.removeItem("doctor-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorLogin.fulfilled, (state, action) => {
        const { doctorData, doctorToken } = action.payload;
        state.doctorData = doctorData;
        state.doctorToken = doctorToken;
        sessionStorage.setItem("doctorData", JSON.stringify(doctorData));
        sessionStorage.setItem("doctor-token", JSON.stringify(doctorToken));
      })
      .addCase(profileEditDoctor.fulfilled, (state, action) => {
        const { 
          doctorprofile, 
          doctorname, 
          doctormobile, 
          doctorstate, 
          doctorcountry, 
          doctorlocation, 
          doctorexperience, 
          doctordescription 
        } = action.payload;
    
        if (doctorprofile) {
          state.doctorData.profileimage = doctorprofile.name
        }
        Object.assign(state.doctorData,{
          drname: doctorname,
          drMobile: doctormobile,
          state: doctorstate,
          country: doctorcountry,
          location: doctorlocation,
          experience: doctorexperience,
          about: doctordescription
        })
        state.editConfirm = true;
        sessionStorage.setItem("doctorData", JSON.stringify(state.doctorData));
      });
  },
});

export default doctorSlice.reducer;
export const { docorLogout } = doctorSlice.actions;
