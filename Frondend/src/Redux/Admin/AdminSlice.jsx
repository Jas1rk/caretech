import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";
import admin_Api from "../../service/AxiosInstance";

const INITIAL_STATE = {
  adminToken: sessionStorage.getItem("admin-token")
    ? JSON.parse(sessionStorage.getItem("admin-token"))
    : null,
  usersList: [],
  filteredUsers:[]
};

const adminSlice = createSlice({
  name: "admin",
  initialState: INITIAL_STATE,
  reducers: {
    adminLogout: (state) => {
      state.adminToken = null;
      sessionStorage.removeItem("admin-token");
    },
    searchUsers: (state, action) => {
      const name = action.payload.toLowerCase();
      state.filteredUsers = state.usersList.filter((user) =>
        user.username.toLowerCase().includes(name)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        const newToken = action.payload;
        state.adminToken = newToken;
        sessionStorage.setItem("admin-token", JSON.stringify(newToken));
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const allUsers = action.payload;
        state.usersList = allUsers;
        state.filteredUsers = allUsers;
      });
  },
});

export const { adminLogout , searchUsers } = adminSlice.actions;
export default adminSlice.reducer;

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async ({ email, password, toast }, { rejectWithValue }) => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields");
      return rejectWithValue("Please fill in all fields");
    } else {
      try {
        const response = await axios.post(`${backendUrl}/admin/adminlogin`, {
          email,
          password,
        });
        if (response.data === "incorrectemail") {
          toast.error("Incorrect email");
          return rejectWithValue("Incorrect email");
        } else if (response.data === "incorrectpassaword") {
          toast.error("Incorrect password");
          return rejectWithValue("Incorrect password");
        } else {
          return response.data;
        }
      } catch (err) {
        toast.error("An error ouccurs Please try again");
        return rejectWithValue(err.message);
      }
    }
  }
);

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await admin_Api.get("/admin/fetchusers");
  return response.data;
});
