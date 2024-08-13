import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import AdminSlice from './Admin/AdminSlice'
import ProfileSlice from "./User/ProfileSlice";


const store = configureStore({
  reducer: {
    user: UserSlice,
    admin: AdminSlice,
    profile: ProfileSlice
  },
});

export default store;
