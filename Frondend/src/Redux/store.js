import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import AdminSlice from "./Admin/AdminSlice";
import DoctorSlice from "./Doctor/DoctorSlice";
import SocketSlice from './SocketClient/Socketclient'

const store = configureStore({
  reducer: {
    user: UserSlice,
    admin: AdminSlice,
    doctor: DoctorSlice,
    socket: SocketSlice
  },
});

export default store;
