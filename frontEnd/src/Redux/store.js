import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./Slices/NavSlice";

const store = configureStore({
  reducer: {
    Navigation: NavSlice,
  },
});

export default store;
