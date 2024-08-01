import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import AdminSlice from './Admin/AdminSlice'


const store = configureStore({
  reducer: {
    user: UserSlice,
    admin: AdminSlice
  },
});

export default store;
