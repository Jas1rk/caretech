import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";

const store = configureStore({
    reducer: {
        user: UserSlice
    }
})

export default store