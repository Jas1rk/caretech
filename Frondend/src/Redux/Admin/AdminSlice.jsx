import { createSlice } from "@reduxjs/toolkit";
import {
  adminLogin,
  fetchUsers,
  fetchCategories,
  editCategory,
  createCategory,
} from "./AdminThunk";

const INITIAL_STATE = {
  adminToken: sessionStorage.getItem("admin-token")
    ? JSON.parse(sessionStorage.getItem("admin-token"))
    : null,
  usersList: [],
  filteredUsers: [],
  categories: [],
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
        );
      });
  },
});

export const { adminLogout, searchUsers } = adminSlice.actions;
export default adminSlice.reducer;
