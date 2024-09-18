import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";
import doctor_Api from "../../service/Doctorinstance";

export const doctorLogin = createAsyncThunk(
  "doctor/doctorLogin",
  async ({ doctorEmail, doctorPass, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/doctor/doctorlogin`, {
        doctorEmail,
        doctorPass,
      });
      switch (data) {
        case "invalidemail":
          toast.error("sorry your email is not found");
          return rejectWithValue("invalid email");

        case "notverified":
          toast.error("sorry your account is not verified");
          return rejectWithValue("not verified");

        case "invalidpassword":
          toast.error("sorry your password is not correct");
          return rejectWithValue("invalid password");

        default:
          return data;
      }
    } catch (error) {
      toast.error("something went wrong");
      return rejectWithValue(error.message);
    }
  }
);



export const profileEditDoctor = createAsyncThunk("doctor/profileEditDoctor",async({})=>{
  // try{
  //   const response = 
  // }catch(err){
  //   console.log(err.message)
  // }
})