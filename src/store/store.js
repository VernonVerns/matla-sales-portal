import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../slices/GlobalSlice.js";
import authSlice from "../slices/AuthSlice.js";
import applicationSlice from "../slices/ApplicationSlice.js";
import chatSlice from "../slices/ChatSlice.js";
import thunk from "redux-thunk"; // Import redux-thunk

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
    applications: applicationSlice.reducer,
    chats: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
