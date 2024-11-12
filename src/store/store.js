import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../slices/GlobalSlice.js";
import authSlice from "../slices/AuthSlice.js";
import applicationSlice from "../slices/ApplicationSlice.js";

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
    applications: applicationSlice.reducer,
  },
});

export default store;
