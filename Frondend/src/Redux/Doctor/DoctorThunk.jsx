import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";

export const doctorLogin = createAsyncThunk(
  "doctor/doctorLogin",
  async ({ doctorEmail, doctorPass, toast }, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(`${backendUrl}/doctor/doctorlogin`, {
        doctorEmail,
        doctorPass,
      });
    } catch (error) {
      toast.error("something went wrong");
      return rejectWithValue(error.message);
    }
  }
);
