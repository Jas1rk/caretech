import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import AdminSlice from "./Admin/AdminSlice";
import DoctorSlice from "./Doctor/DoctorSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    admin: AdminSlice,
    doctor: DoctorSlice
  },
});

export default store;
