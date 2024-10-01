import { createSlice } from "@reduxjs/toolkit";
import {
  adminLogin,
  fetchUsers,
  fetchCategories,
  editCategory,
  createCategory,
  fetchNewDoctors,
} from "./AdminThunk";

const INITIAL_STATE = {
  isAuthAdmin: false,
  usersList: [],
  filteredUsers: [],
  categories: [],
  doctorsList: [],

};

const adminSlice = createSlice({
  name: "admin",
  initialState: INITIAL_STATE,
  reducers: {
    adminLogout: (state) => {
      state.isAuthAdmin = false;
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
        const status = action.payload
        state.isAuthAdmin = status ? true : false
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const allUsers = action.payload;
        state.usersList = allUsers;
        state.filteredUsers = allUsers;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const allCategories = action.payload;
        state.categories = allCategories;
        
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const { categoryid, category, description } = action.payload;
        state.categories = state.categories.map((cat) =>
          cat._id === categoryid ? { ...cat, category, description } : cat
        )
      })
      .addCase(fetchNewDoctors.fulfilled,(state,action) => {
        const allDoctors = action.payload
        state.doctorsList = allDoctors
      })
  },
});

export const { adminLogout, searchUsers } = adminSlice.actions;
export default adminSlice.reducer;
