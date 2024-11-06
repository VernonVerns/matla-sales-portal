import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../slices/GlobalSlice.js";

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export default store;