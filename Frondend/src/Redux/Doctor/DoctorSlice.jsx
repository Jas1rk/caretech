import { createSlice } from "@reduxjs/toolkit";
import { doctorLogin, profileEditDoctor } from "./DoctorThunk";

const INITIAL_STATE = {
  doctorData: sessionStorage.getItem("doctorData")
    ? JSON.parse(sessionStorage.getItem("doctorData"))
    : null,
  isAuthDoctor: sessionStorage.getItem("doctorData") ? true : false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState: INITIAL_STATE,
  reducers: {
    docorLogout: (state) => {
      state.doctorData = null;
      state.isAuthDoctor = false;
      sessionStorage.removeItem("doctorData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorLogin.fulfilled, (state, action) => {
        const doctorData = action.payload;
        state.doctorData = doctorData;
        state.isAuthDoctor = true 
        sessionStorage.setItem("doctorData", JSON.stringify(doctorData));
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
          doctordescription,
        } = action.payload;

        if (doctorprofile) {
          state.doctorData.profileimage = doctorprofile.name;
        }
        Object.assign(state.doctorData, {
          drname: doctorname,
          drMobile: doctormobile,
          state: doctorstate,
          country: doctorcountry,
          location: doctorlocation,
          experience: doctorexperience,
          about: doctordescription,
        });
        state.editConfirm = true;
        sessionStorage.setItem("doctorData", JSON.stringify(state.doctorData));
      });
  },
});

export default doctorSlice.reducer;
export const { docorLogout } = doctorSlice.actions;
